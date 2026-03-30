DROP DATABASE IF EXISTS jd_games;
CREATE DATABASE jd_games;
USE jd_games;

CREATE TABLE genres (
    id   INT          PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE games (
    id           INT          PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(255) NOT NULL,
    developer    VARCHAR(255) NOT NULL,
    release_year YEAR         NOT NULL,
    description  TEXT,
    cover_image  VARCHAR(255),
    genre_id     INT,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

INSERT INTO genres (name) VALUES
    ('Action-Adventure'),
    ('FPS'),
    ('Horror'),
    ('Platformer'),
    ('Puzzle'),
    ('RPG'),
    ('Sports'),
    ('Strategy');

INSERT INTO games (title, developer, release_year, description, cover_image, genre_id) VALUES
    ('The Legend of Zelda: Breath of the Wild', 'Nintendo', 2017,
     'An open-world action-adventure set in the ruins of Hyrule. Players explore freely, solve shrines, and defeat Calamity Ganon.',
     'botw.jpg', 1),
    ('The Witcher 3: Wild Hunt', 'CD Projekt Red', 2015,
     'A massive open-world RPG following monster hunter Geralt of Rivia as he searches for his missing ward in a war-torn world.',
     'witcher3.jpg', 6),
    ('Halo: Combat Evolved', 'Bungie', 2001,
     'The game that defined console first-person shooters. Master Chief crash-lands on a mysterious ring world filled with alien enemies.',
     'halo-ce.jpg', 2),
    ('Super Mario Odyssey', 'Nintendo', 2017,
     'Mario travels across colourful kingdoms collecting Power Moons to rescue Princess Peach from Bowser.',
     'mario-odyssey.jpg', 4),
    ('Civilization VI', 'Firaxis Games', 2016,
     'A turn-based strategy game where you build an empire from ancient times to the modern era, competing against AI civilizations.',
     'civ6.jpg', 8),
    ('Resident Evil Village', 'Capcom', 2021,
     'A survival horror FPS sequel where Ethan Winters searches for his kidnapped daughter in a mysterious European village.',
     'resident-evil.jpg', 3),
    ('Portal 2', 'Valve', 2011,
     'A puzzle-platformer where you use a portal gun to solve increasingly clever spatial puzzles alone or with a friend.',
     'portal2.jpg', 5),
    ('FIFA 23', 'EA Sports', 2022,
     'The latest entry in the long-running football simulation series featuring real clubs, players, and tournaments worldwide.',
     'fifa23.jpg', 7);
