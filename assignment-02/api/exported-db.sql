-- Video Games Collection Database
-- Database name uses initials: jd_games
-- Run this file to recreate the database from scratch

DROP DATABASE IF EXISTS jd_games;
CREATE DATABASE jd_games;
USE jd_games;

-- genres is a secondary/lookup table that stores game genre categories
-- games will reference this table via a foreign key
CREATE TABLE genres (
    id   INT          PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- games is the main table storing all the video game data
-- cover_image stores just the filename of the uploaded image (not the full path)
-- genre_id links each game to a row in the genres table
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

-- Seed the genres lookup table with common video game categories
INSERT INTO genres (name) VALUES
    ('Action-Adventure'),
    ('FPS'),
    ('Horror'),
    ('Platformer'),
    ('Puzzle'),
    ('RPG'),
    ('Sports'),
    ('Strategy');

-- Seed sample games so there is data to display on first run
-- cover_image is NULL for seeded data since no file has been uploaded
INSERT INTO games (title, developer, release_year, description, cover_image, genre_id) VALUES
    ('The Legend of Zelda: Breath of the Wild', 'Nintendo', 2017,
     'An open-world action-adventure set in the ruins of Hyrule. Players explore freely, solve shrines, and defeat Calamity Ganon.',
     NULL, 1),
    ('The Witcher 3: Wild Hunt', 'CD Projekt Red', 2015,
     'A massive open-world RPG following monster hunter Geralt of Rivia as he searches for his missing ward in a war-torn world.',
     NULL, 6),
    ('Halo: Combat Evolved', 'Bungie', 2001,
     'The game that defined console first-person shooters. Master Chief crash-lands on a mysterious ring world filled with alien enemies.',
     NULL, 2),
    ('Super Mario Odyssey', 'Nintendo', 2017,
     'Mario travels across colourful kingdoms collecting Power Moons to rescue Princess Peach from Bowser.',
     NULL, 4),
    ('Civilization VI', 'Firaxis Games', 2016,
     'A turn-based strategy game where you build an empire from ancient times to the modern era, competing against AI civilizations.',
     NULL, 8),
    ('Resident Evil Village', 'Capcom', 2021,
     'A survival horror FPS sequel where Ethan Winters searches for his kidnapped daughter in a mysterious European village.',
     NULL, 3),
    ('Portal 2', 'Valve', 2011,
     'A puzzle-platformer where you use a portal gun to solve increasingly clever spatial puzzles alone or with a friend.',
     NULL, 5),
    ('FIFA 23', 'EA Sports', 2022,
     'The latest entry in the long-running football simulation series featuring real clubs, players, and tournaments worldwide.',
     NULL, 7);
