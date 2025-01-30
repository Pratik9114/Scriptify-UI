from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import re
from datetime import timedelta
from supabase import create_client
import os
from dotenv import load_dotenv
from urllib.request import urlopen
import json
from html import unescape
import os
from groq import Groq

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

# Setup Groq
api_key = os.getenv("GROQ_API_KEY")
client = Groq(
    api_key=api_key,
)

def extract_video_id(url):
    """Extract YouTube video ID from URL."""
    pattern = r'(?:v=|\/)([0-9A-Za-z_-]{11}).*'
    match = re.search(pattern, url)
    return match.group(1) if match else None

def get_transcript(video_id):
    """Get video transcript."""
    try:
        transcript_url = f"https://www.youtube.com/api/timedtext?v={video_id}&lang=en&fmt=json3"
        with urlopen(transcript_url) as response:
            if response.getcode() != 200:
                return None
            data = json.load(response)
            transcript_text = ""
            for entry in data.get('events', []):
                if 'segs' in entry:
                    for seg in entry['segs']:
                        transcript_text += unescape(seg['utf8']) + " "
            return transcript_text.strip()
    except Exception as e:
        return None

def split_text(text, max_tokens=2000):
    """Splits text into smaller segments based on approximate token count."""
    words = text.split()
    segments = [ ]
    current_segment = []
    current_token_count = 0

    for word in words:
        current_segment.append(word)
        current_token_count += len(word)  # Approximating tokens as word length

        if current_token_count >= max_tokens:
            segments.append(" ".join(current_segment))
            current_segment = []
            current_token_count = 0

    # Add any remaining words to the last segment
    if current_segment:
        segments.append(" ".join(current_segment))

    return segments

def generate_summary(text):
    """Generate summary using Groq model."""
    if not text:
        return "No transcript available."
    
    segments = split_text(text)
    all_results = []
    for segment in segments:
        prompt = f'"Answer questions based on: \ntext = "{segment}. What is classification and what is taught here?"'
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        all_results.append(chat_completion.choices[0].message.content)
    
    return " ".join(all_results)

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
