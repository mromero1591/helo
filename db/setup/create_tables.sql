CREATE TABLE users (id SERIAL PRIMARY KEY,
                                      username TEXT, password TEXT, profile_pic TEXT, created_on TIMESTAMP DEFAULT NOW())
CREATE TABLE posts (id SERIAL PRIMARY KEY,
                                      title VARCHAR(45),
                                            img TEXT, content TEXT, author_id INT REFERENCES users(id));