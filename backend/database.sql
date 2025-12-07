-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  scientific_name VARCHAR(255),
  growth_days INTEGER
);

-- Create diseases table
CREATE TABLE IF NOT EXISTS diseases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  crop_id INTEGER REFERENCES crops(id),
  symptoms TEXT,
  treatment TEXT,
  confidence_threshold FLOAT DEFAULT 0.7
);

-- Create analysis history table
CREATE TABLE IF NOT EXISTS analysis_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  analysis_type VARCHAR(50),
  crop_type VARCHAR(255),
  disease_detected VARCHAR(255),
  severity FLOAT,
  soil_type VARCHAR(255),
  fertility_score FLOAT,
  npk_nitrogen FLOAT,
  npk_phosphorus FLOAT,
  npk_potassium FLOAT,
  crop_confidence FLOAT,
  disease_confidence FLOAT,
  image_path VARCHAR(500),
  analysis_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create nutrient predictions table
CREATE TABLE IF NOT EXISTS nutrient_predictions (
  id SERIAL PRIMARY KEY,
  analysis_id INTEGER NOT NULL REFERENCES analysis_history(id) ON DELETE CASCADE,
  nitrogen FLOAT,
  phosphorus FLOAT,
  potassium FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_analysis ON analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_type ON analysis_history(analysis_type);
CREATE INDEX IF NOT EXISTS idx_created_at ON analysis_history(created_at DESC);
