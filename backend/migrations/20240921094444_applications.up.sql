CREATE TYPE ApplicationStatus AS ENUM (
    'pending', 'accepted', 'declined'
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    course_id INT NOT NULL REFERENCES courses(id),
    semester INT CHECK (semester > 0),
    degree VARCHAR(50),
    experience TEXT,
    status ApplicationStatus NOT NULL DEFAULT 'pending',
    messaged BOOLEAN DEFAULT FALSE,
    talked BOOLEAN DEFAULT FALSE,
    club_briefed BOOLEAN DEFAULT FALSE,
    security_briefed BOOLEAN DEFAULT FALSE,
    information TEXT,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
