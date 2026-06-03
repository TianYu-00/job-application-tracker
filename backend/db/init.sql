DROP TABLE IF EXISTS applications;

CREATE TABLE applications (
  id          SERIAL PRIMARY KEY,
  url         TEXT NOT NULL UNIQUE,
  title       TEXT,
  company     TEXT,
  city        TEXT,
  description TEXT,
  status      TEXT DEFAULT 'applied',
  applied_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);