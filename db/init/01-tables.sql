CREATE TABLE IF NOT EXISTS elements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    symbol VARCHAR(3) NOT NULL UNIQUE,
    atomic_number INT NOT NULL UNIQUE,
    atomic_weight DECIMAL(6, 3),
    group_number INT NOT NULL CHECK (group_number BETWEEN 1 AND 18),
    period INT NOT NULL CHECK (period BETWEEN 1 AND 7),
    block VARCHAR(1) NOT NULL CHECK (block IN ('s', 'p', 'd', 'f'))
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

CREATE INDEX IF NOT EXISTS idx_elements_atomic_number ON elements(atomic_number);
CREATE INDEX IF NOT EXISTS idx_elements_name ON elements(name);
CREATE INDEX IF NOT EXISTS idx_elements_group_number ON elements(group_number);
CREATE INDEX IF NOT EXISTS idx_elements_period ON elements(period);
CREATE INDEX IF NOT EXISTS idx_elements_block ON elements(block);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
