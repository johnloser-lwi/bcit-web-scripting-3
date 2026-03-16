-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 21, 2025 at 05:00 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `artist_id`, `image_name`, `description`) VALUES
(1, 'Healing Dreams', 1, 'charlie-dreaming--healing-dreams.jpg', 'charlie dreaming is the ambient moniker of Cory Giordano, founder of both Inner Ocean Records and Drift Label. His music is curated with relaxing guitars and hypnotic synths that allow for a perfect atmosphere for reflection and tranquility; reconnect with the self.&nbsp; Healing Dreams is a series of EP\'s released from 2018-2024, this cassette tape is a collection of the Healing Dreams together.&nbsp; charlie dreaming creates an immersive and sonic landscape that transports you into a realm of imagination and serenity.'),
(2, 'Enchanted Forest', 2, 'gas-lab--enchanted-forest.jpg', 'Hailing respectively from Argentina and USA, the two composers have made a name of their own in the Jazz Beats scene. Their success is due in no small part to their creativity on bass, production and saxophone.'),
(3, 'Juicy Curveballs', 3, 'tiny-blips--juicy-curveball.jpg', '‘juicy curveballs: beat tape’ is an album of raw, gritty, soul-filled beats and compositions by producer and multi-instrumentalist tiny.blips. 18 fun size tracks are woven together in an&nbsp;abstract, yet playful depiction of existence through heavy grooves, melodies and found sounds.&nbsp;'),
(4, 'Iconologie', 4, 'kazumi-kaneda--iconologie.jpg', 'The long awaited new album by Tokyo based force of nature, Kazumi Kaneda. Always at the forefront of stellar jazz music, Kaneda does not disappoint with \"Iconologie\", his first new full length release in over 5 years. Quietly perfecting his jazz chops for years, Kaneda presents us with a masterpiece; a collision of jazz, electronic and hip hop of epic proportions. \"Iconologie\" is a gateway into a new universe and we\'re here for it!');

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`) VALUES
(1, 'Charlie Dreaming'),
(2, 'Gas Lab'),
(4, 'Kazumi Kaneda'),
(3, 'tiny.blips');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
