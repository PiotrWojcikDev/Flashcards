CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(12) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);


CREATE TABLE IF NOT EXISTS sets (
    set_id SERIAL PRIMARY KEY,
    set_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP NULL,
    flashcard_count INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS flashcards (
	flashcard_id SERIAL PRIMARY KEY,
	front VARCHAR (50) NOT NULL,
	back VARCHAR (50) NOT NULL,
	set_id INTEGER REFERENCES sets (set_id)
);

CREATE TABLE IF NOT EXISTS progress (
	progress_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (user_id),
	flashcard_id INTEGER REFERENCES flashcards (flashcard_id),
	last_reviewd TIMESTAMP,
	is_learned BOOLEAN
);

CREATE TABLE IF NOT EXISTS notifications (
	notification_id  SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (user_id),
	notification_content VARCHAR (50) NOT NULL,
	timestamp TIMESTAMP
);


