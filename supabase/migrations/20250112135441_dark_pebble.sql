/*
  # Create summaries table

  1. New Tables
    - `summaries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `video_url` (text)
      - `video_id` (text)
      - `summary` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `summaries` table
    - Add policies for authenticated users to:
      - Read their own summaries
      - Create new summaries
*/

CREATE TABLE IF NOT EXISTS summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  video_url text NOT NULL,
  video_id text NOT NULL,
  summary text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own summaries
CREATE POLICY "Users can read own summaries"
  ON summaries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create summaries
CREATE POLICY "Users can create summaries"
  ON summaries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
