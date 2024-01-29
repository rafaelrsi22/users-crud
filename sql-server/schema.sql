CREATE TABLE users
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    username VARCHAR(64) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE profiles
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    bio VARCHAR(128) NOT NULL,
    CONSTRAINT profiles_pk PRIMARY KEY (id)
);

CREATE TABLE users_profiles
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    profile_id INT UNSIGNED NOT NULL,
    CONSTRAINT up_pk PRIMARY KEY (id),
    CONSTRAINT up_uk UNIQUE KEY (user_id, profile_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT profile_fk FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

--- PLACEHOLDER vvvv

INSERT INTO users (username) VALUES ("Adoleta");
INSERT INTO profiles (bio) VALUES ("Olá, meu nome é Adoleta!");
INSERT INTO users_profiles (user_id, profile_id) SELECT
    (SELECT id FROM users u WHERE u.username = "Adoleta"),
    (SELECT id FROM profiles p WHERE p.bio LIKE "%Adoleta%");

---- GET USERS LIST FORMAT

SELECT u.username, p.bio, u.created_at, u.updated_at FROM users_profiles up
    JOIN users u
    ON up.user_id = u.id
    JOIN profiles p
    ON up.profile_id = p.id;