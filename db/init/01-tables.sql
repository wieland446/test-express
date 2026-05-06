CREATE TABLE IF NOT EXISTS blocks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(1) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS periods (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL UNIQUE CHECK (number BETWEEN 1 AND 7)
);

CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL UNIQUE CHECK (number BETWEEN 1 AND 18),
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS elements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    symbol VARCHAR(3) NOT NULL UNIQUE,
    atomic_number INT NOT NULL UNIQUE,
    atomic_weight DECIMAL(6, 3),
    group_id INT NOT NULL,
    period_id INT NOT NULL,
    block_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (period_id) REFERENCES periods(id),
    FOREIGN KEY (block_id) REFERENCES blocks(id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_elements_atomic_number ON elements(atomic_number);
CREATE INDEX IF NOT EXISTS idx_elements_name ON elements(name);
CREATE INDEX IF NOT EXISTS idx_elements_group_id ON elements(group_id);
CREATE INDEX IF NOT EXISTS idx_elements_period_id ON elements(period_id);
CREATE INDEX IF NOT EXISTS idx_elements_block_id ON elements(block_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
