from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import re
from datetime import timedelta
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Setup JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your-secret-key")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)

# Setup Supabase
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Initialize summarizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def extract_video_id(url):
    """Extract YouTube video ID from URL."""
    pattern = r'(?:v=|\/)([0-9A-Za-z_-]{11}).*'
    match = re.search(pattern, url)
    return match.group(1) if match else None

def get_transcript(video_id):
    """Get video transcript."""
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([entry["text"] for entry in transcript])
    except Exception as e:
        return None

def generate_summary(text):
    """Generate summary using BART model."""
    # Split text into chunks if it's too long
    max_chunk_length = 1024
    chunks = [text[i:i + max_chunk_length] for i in range(0, len(text), max_chunk_length)]
    
    summaries = []
    for chunk in chunks:
        summary = summarizer(chunk, max_length=130, min_length=30, do_sample=False)
        summaries.append(summary[0]['summary_text'])
    
    return " ".join(summaries)

@app.route('/api/summarize', methods=['POST'])
@jwt_required()
def summarize():
    user_id = get_jwt_identity()
    data = request.json
    video_url = data.get('url')
    
    if not video_url:
        return jsonify({'error': 'URL is required'}), 400
    
    video_id = extract_video_id(video_url)
    if not video_id:
        return jsonify({'error': 'Invalid YouTube URL'}), 400
    
    transcript = get_transcript(video_id)
    if not transcript:
        return jsonify({'error': 'Could not fetch transcript'}), 400
    
    summary = generate_summary(transcript)
    
    # Store in database
    summary_data = {
        'user_id': user_id,
        'video_url': video_url,
        'video_id': video_id,
        'summary': summary,
    }
    
    result = supabase.table('summaries').insert(summary_data).execute()
    
    return jsonify({
        'summary': summary,
        'video_id': video_id
    })

@app.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    
    result = supabase.table('summaries')\
        .select('*')\
        .eq('user_id', user_id)\
        .order('created_at', desc=True)\
        .execute()
    
    return jsonify(result.data)

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    try:
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        
        access_token = create_access_token(identity=auth_response.user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': auth_response.user.id,
                'email': email
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        access_token = create_access_token(identity=auth_response.user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': auth_response.user.id,
                'email': email
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 401

if __name__ == '__main__':
    app.run(debug=True)