-- psql "postgres://{user}:{password}@{name}.{location}.postgres.vercel-storage.com:5432/verceldb" -f init.sql
-- run above to seed database
CREATE TABLE IF NOT EXISTS verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  role VARCHAR(255),
  class_year VARCHAR(255),
  advisor_id INT,
  FOREIGN KEY (advisor_id) REFERENCES users(id),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS talks (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  datetime TIMESTAMPTZ NOT NULL,
  location VARCHAR(255),
  creator_id INT,

  FOREIGN KEY (creator_id) REFERENCES users(id),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY,
  student_id INT NOT NULL,
  talk_id INT NOT NULL,
  content JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (talk_id) REFERENCES talks(id)
)