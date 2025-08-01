CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    uname VARCHAR(50),
    passwd VARCHAR(100),
    email VARCHAR(100),
    tz VARCHAR(20)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
