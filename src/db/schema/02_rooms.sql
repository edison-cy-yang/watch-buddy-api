-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS rooms CASCADE;
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  video_url TEXT NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
