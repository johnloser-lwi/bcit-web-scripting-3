-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 19, 2024 at 05:52 AM
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
-- Database: `world_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(8) NOT NULL,
  `name` varchar(32) NOT NULL,
  `pop` int(32) NOT NULL,
  `area` int(32) NOT NULL,
  `flag` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `pop`, `area`, `flag`) VALUES
(1, 'Afganistan', 42239854, 652864, '640px-Flag_of_Afghanistan.svg.png'),
(2, 'Albania', 2832439, 28748, '640px-Flag_of_Albania.svg.png'),
(3, 'Algeria', 45606480, 2381741, '640px-Flag_of_Algeria.svg.png'),
(4, 'Andorra', 80088, 468, '640px-Flag_of_Andorra.svg.png'),
(5, 'Angola', 36684202, 1246700, '640px-Flag_of_Angola.svg.png'),
(6, 'Antigua and Barbuda', 94298, 442, '640px-Flag_of_Antigua_and_Barbuda.svg.png'),
(7, 'Argentina', 45773884, 2780400, '640px-Flag_of_Argentina.svg.png'),
(8, 'Armenia', 2777970, 29743, '640px-Flag_of_Armenia.svg.png'),
(9, 'Australia', 26439111, 7741220, '640px-Flag_of_Australia_(converted).svg.png'),
(10, 'Austria', 8958960, 83878, '640px-Flag_of_Austria.svg.png'),
(11, 'Azerbaijan', 10412651, 86600, '640px-Flag_of_Azerbaijan.svg.png'),
(12, 'Bahamas', 412623, 13880, '640px-Flag_of_the_Bahamas.svg.png'),
(13, 'Bahrain', 1485509, 778, '640px-Flag_of_Bahrain.svg.png'),
(14, 'Bangladesh', 172954319, 148460, '640px-Flag_of_Bangladesh.svg.png'),
(15, 'Barbados', 281995, 431, '640px-Flag_of_Barbados.svg.png'),
(16, 'Belarus', 9498238, 207600, '640px-Flag_of_Belarus.svg.png'),
(17, 'Belgium', 11686140, 30528, '554px-Flag_of_Belgium.svg.png'),
(18, 'Belize', 410825, 22965, '640px-Flag_of_Belize.svg.png'),
(19, 'Benin', 13712828, 114763, '640px-Flag_of_Benin.svg.png'),
(20, 'Bhutan', 787424, 38394, '640px-Flag_of_Bhutan.svg.png'),
(21, 'Bolivia', 12388571, 1098581, '640px-Flag_of_Bolivia_(state).svg.png'),
(22, 'Bosnia and Herzegovina', 3210847, 51209, '640px-Flag_of_Bosnia_and_Herzegovina.svg.png'),
(23, 'Botswana', 2675352, 582000, '640px-Flag_of_Botswana.svg.png'),
(24, 'Brazil', 216422446, 8510346, '640px-Flag_of_Brazil.svg.png'),
(25, 'Brunei', 452524, 5765, '640px-Flag_of_Brunei.svg.png'),
(26, 'Bulgaria', 6687717, 110879, '640px-Flag_of_Bulgaria.svg.png'),
(27, 'Burkina Faso', 23251485, 274200, '640px-Flag_of_Burkina_Faso.svg.png'),
(28, 'Burundi', 13238559, 27834, '640px-Flag_of_Burundi.svg.png'),
(29, 'Cambodia', 16944826, 181035, '640px-Flag_of_Cambodia.svg.png'),
(30, 'Cameroon', 28647293, 475650, '640px-Flag_of_Cameroon.svg.png'),
(31, 'Canada', 38781291, 9984670, '640px-Flag_of_Canada.svg.png'),
(32, 'Central African Republic', 5742315, 622984, '640px-Flag_of_the_Central_African_Republic.svg.png'),
(33, 'Cape Verde', 598682, 4033, '640px-Flag_of_Cape_Verde.svg.png'),
(34, 'Chad', 18278568, 1284000, '640px-Flag_of_Chad.svg.png'),
(35, 'Chile', 19629590, 756102, '640px-Flag_of_Chile.svg.png'),
(36, 'China', 1425671352, 9596960, '640px-Flag_of_the_People\'s_Republic_of_China.svg.png'),
(37, 'Colombia', 52085168, 1138910, '640px-Flag_of_Colombia.svg.png'),
(38, 'Comoros', 852075, 1861, '640px-Flag_of_the_Comoros.svg.png'),
(39, 'Congo', 6106869, 342000, '640px-Flag_of_the_Republic_of_the_Congo.svg.png'),
(40, 'Costa Rica', 5212173, 51100, '640px-Flag_of_Costa_Rica_(state).svg.png'),
(41, 'Croatia', 4008617, 56594, '640px-Flag_of_Croatia.svg.png'),
(42, 'Cuba', 11194449, 109884, '640px-Flag_of_Cuba.svg.png'),
(43, 'Côte d\'Ivoire', 28873034, 322462, '640px-Flag_of_Côte_d\'Ivoire.svg.png'),
(44, 'Cyprus', 1260138, 9251, '640px-Flag_of_Cyprus.svg.png'),
(45, 'Czechia', 10495295, 78871, '640px-Flag_of_the_Czech_Republic.svg.png'),
(46, 'Denmark', 5910913, 2210573, 'Flag_of_Denmark.svg'),
(47, 'Democratic Republic of the Congo', 102262808, 2344858, '640px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png'),
(48, 'Djibouti', 1136455, 23200, '640px-Flag_of_Djibouti.svg.png'),
(49, 'Dominica', 73040, 750, '640px-Flag_of_Dominica.svg.png'),
(50, 'Dominican Republic', 11332972, 48670, '640px-Flag_of_the_Dominican_Republic.svg.png'),
(51, 'East Timor', 1360596, 14874, '640px-Flag_of_East_Timor.svg.png'),
(52, 'Ecuador', 18190, 283561, '640px-Flag_of_Ecuador.svg.png'),
(53, 'Egypt', 112716598, 1001450, '640px-Flag_of_Egypt.svg.png'),
(54, 'El Salvador', 6364943, 21041, '640px-Flag_of_El_Salvador.svg.png'),
(55, 'Equatorial Guinea', 1714671, 28051, '640px-Flag_of_Equatorial_Guinea.svg.png'),
(56, 'Eritrea', 3748901, 117600, '640px-Flag_of_Eritrea.svg.png'),
(57, 'Estonia', 1322765, 45339, '640px-Flag_of_Estonia.svg.png'),
(58, 'Eswatini', 1210822, 17353, '640px-Flag_of_Eswatini.svg.png'),
(59, 'Ethiopia', 126527060, 1104300, '640px-Flag_of_Ethiopia.svg.png'),
(60, 'Fiji', 936375, 18272, '640px-Flag_of_Fiji.svg.png'),
(61, 'Finland', 5545475, 338145, '640px-Flag_of_Finland.svg.png'),
(62, 'France', 64756584, 643801, '640px-Flag_of_France.svg.png'),
(63, 'Gabon', 2463566, 267668, 'Flag_of_Gabon.svg'),
(64, 'Gambia', 2773168, 11295, '640px-Flag_of_The_Gambia.svg.png'),
(65, 'Georgia', 3728282, 69700, '640px-Flag_of_Georgia.svg.png'),
(66, 'Germany', 83294633, 357561, '640px-Flag_of_Germany.svg.png'),
(67, 'Ghana', 34121985, 238537, '640px-Flag_of_Ghana.svg.png'),
(68, 'Greece', 10341277, 131958, 'Flag_of_Greece.svg'),
(69, 'Guatemala', 56643, 18092026, '640px-Flag_of_Guatemala.svg.png'),
(70, 'Grenada', 126183, 345, '640px-Flag_of_Grenada.svg.png'),
(71, 'Guinea', 14190612, 245857, '640px-Flag_of_Guinea.svg.png'),
(72, 'Guinea-Bissau', 2150842, 36125, '640px-Flag_of_Guinea-Bissau.svg.png'),
(73, 'Guyana', 813834, 214969, '640px-Flag_of_Guyana.svg.png'),
(74, 'Haiti', 11724763, 27750, '640px-Flag_of_Haiti.svg.png'),
(75, 'Honduras', 10593798, 112492, '640px-Flag_of_Honduras.svg.png'),
(76, 'Hungary', 10156239, 93025, '640px-Flag_of_Hungary.svg.png'),
(77, 'Iceland', 375318, 103000, '640px-Flag_of_Iceland.svg.png'),
(78, 'India', 1428627663, 3287263, '640px-Flag_of_India.svg.png'),
(79, 'Indonesia', 277564122, 1904569, '640px-Flag_of_Indonesia.svg.png'),
(80, 'Iran', 89172767, 1648795, 'Flag_of_Iran.svg'),
(81, 'Iraq', 45504560, 438317, '640px-Flag_of_Iraq.svg.png'),
(82, 'Ireland', 5056935, 70273, '640px-Flag_of_Ireland.svg.png'),
(83, 'Israel', 9174520, 21937, '640px-Flag_of_Israel.svg.png'),
(84, 'Jamaica', 2825544, 10991, '640px-Flag_of_Jamaica.svg.png'),
(85, 'Italy', 58870762, 302068, '640px-Flag_of_Italy.svg.png'),
(86, 'Japan', 123294513, 377915, '640px-Flag_of_Japan.svg.png'),
(87, 'Jordan', 11337052, 89318, '640px-Flag_of_Jordan.svg.png'),
(88, 'Kazakhstan', 19606633, 2724910, '640px-Flag_of_Kazakhstan.svg.png'),
(89, 'Kenya', 55100586, 580367, '640px-Flag_of_Kenya.svg.png'),
(90, 'Kiribati', 133515, 811, 'Flag_of_Kiribati.svg'),
(91, 'Kuwait', 4310108, 17818, '640px-Flag_of_Kuwait.svg.png'),
(92, 'Kyrgyzstan', 6735347, 199949, '640px-Flag_of_Kyrgyzstan.svg.png'),
(93, 'Laos', 7633779, 236800, '640px-Flag_of_Laos.svg.png'),
(94, 'Latvia', 1830211, 64594, '640px-Flag_of_Latvia.svg.png'),
(95, 'Lebanon', 5353930, 10452, '640px-Flag_of_Lebanon.svg.png'),
(96, 'Lesotho', 30355, 2330318, '640px-Flag_of_Lesotho.svg.png'),
(97, 'Liberia', 5418377, 111369, '640px-Flag_of_Liberia.svg.png'),
(98, 'Libya', 6888388, 1759540, '640px-Flag_of_Libya.svg.png'),
(99, 'Liechtenstein', 39584, 160, '640px-Flag_of_Liechtenstein.svg.png'),
(100, 'Lithuania', 2718352, 65286, '640px-Flag_of_Lithuania.svg.png'),
(101, 'Madagascar', 30325732, 587041, '640px-Flag_of_Madagascar.svg.png'),
(102, 'Malawi', 20931751, 118484, '640px-Flag_of_Malawi.svg.png'),
(103, 'Malaysia', 34308525, 118484, '640px-Flag_of_Malaysia.svg.png'),
(104, 'Maldives', 521021, 329847, '640px-Flag_of_Maldives.svg.png'),
(105, 'Mali', 23293698, 1240192, '640px-Flag_of_Mali.svg.png'),
(106, 'Malta', 535064, 315, '640px-Flag_of_Malta.svg.png'),
(107, 'Marshall Islands', 41996, 181, '640px-Flag_of_the_Marshall_Islands.svg.png'),
(108, 'Mauritania', 4862989, 1030700, '640px-Flag_of_Mauritania.svg.png'),
(109, 'Mauritius', 1300557, 2040, '640px-Flag_of_Mauritius.svg.png'),
(110, 'Mexico', 128455567, 1964375, '640px-Flag_of_Mexico.svg.png'),
(111, 'Micronesia', 544321, 702, '640px-Flag_of_the_Federated_States_of_Micronesia.svg.png'),
(112, 'Moldova', 3435931, 33847, '640px-Flag_of_Moldova.svg.png'),
(113, 'Monaco', 36297, 2, '600px-Flag_of_Monaco.svg.png'),
(114, 'Mongolia', 3447157, 1564116, '640px-Flag_of_Mongolia.svg.png'),
(115, 'Montenegro', 626485, 13812, '640px-Flag_of_Montenegro.svg.png'),
(116, 'Morocco', 37840044, 446550, '640px-Flag_of_Morocco.svg.png'),
(117, 'Mozambique', 33897354, 799380, '640px-Flag_of_Mozambique.svg.png'),
(118, 'Myanmar', 54577997, 676578, '640px-Flag_of_Myanmar.svg.png'),
(119, 'Namibia', 2604172, 824292, '640px-Flag_of_Namibia.svg.png'),
(120, 'Nauru', 12780, 21, 'Flag_of_Nauru.svg'),
(121, 'Nepal', 30896590, 147181, '394px-Flag_of_Nepal.svg.png'),
(122, 'Netherlands', 17618299, 41865, '640px-Flag_of_the_Netherlands.svg.png'),
(123, 'New Zealand', 5228100, 268838, '640px-Flag_of_New_Zealand.svg.png'),
(124, 'Nicaragua', 7046310, 130373, '640px-Flag_of_Nicaragua.svg.png'),
(125, 'Niger', 27202843, 1267000, '560px-Flag_of_Niger.svg.png'),
(126, 'Nigeria', 223804632, 923768, '640px-Flag_of_Nigeria.svg.png'),
(127, 'North Korea', 26160821, 120538, '640px-Flag_of_North_Korea.svg.png'),
(128, 'North Macedonia', 2085679, 25713, '640px-Flag_of_North_Macedonia.svg.png'),
(129, 'Norway', 5474360, 386224, 'Flag_of_Norway.svg'),
(130, 'Oman', 4644384, 309500, '640px-Flag_of_Oman.svg.png'),
(131, 'Pakistan', 240485658, 882363, '640px-Flag_of_Pakistan.svg.png'),
(132, 'Palau', 18058, 459, '640px-Flag_of_Palau.svg.png'),
(133, 'Palestine', 5371230, 6020, '640px-Flag_of_Palestine.svg.png'),
(134, 'Panama', 4468087, 75320, '640px-Flag_of_Panama.svg.png'),
(135, 'Paraguay', 6861524, 406752, '640px-Flag_of_Paraguay.svg.png'),
(136, 'Peru', 34352719, 1285216, '640px-Flag_of_Peru_(state).svg.png'),
(137, 'Papua New Guinea', 10329931, 462840, 'Flag_of_Papua_New_Guinea.svg'),
(138, 'Philippines', 117337368, 300000, '640px-Flag_of_the_Philippines.svg.png'),
(139, 'Poland', 41026067, 312685, '640px-Flag_of_Poland.svg.png'),
(140, 'Portugal', 10247605, 92225, 'Flag_of_Portugal.svg'),
(141, 'Qatar', 2716391, 11586, '640px-Flag_of_Qatar.svg.png'),
(142, 'Romania', 19892812, 238398, 'Flag_of_Romania.svg'),
(143, 'Russia', 144444359, 17098246, '640px-Flag_of_Russia.svg.png'),
(144, 'Rwanda', 14094683, 26338, '640px-Flag_of_Rwanda.svg.png'),
(145, 'Saint Kitts and Nevis', 47755, 261, '640px-Flag_of_Saint_Kitts_and_Nevis.svg.png'),
(146, 'Saint Lucia', 180251, 616, '640px-Flag_of_Saint_Lucia.svg.png'),
(147, 'St. Vincent & Grenadines', 103698, 389, '640px-Flag_of_Saint_Vincent_and_the_Grenadines.svg.png'),
(148, 'Samoa', 225681, 2842, '640px-Flag_of_Samoa.svg.png'),
(149, '33642', 33642, 61, '640px-Flag_of_San_Marino.svg.png'),
(150, 'São Tomé and Príncipe', 231856, 964, '640px-Flag_of_São_Tomé_and_Príncipe.svg.png'),
(151, 'Saudi Arabia', 36947025, 2149690, '640px-Flag_of_Saudi_Arabia.svg.png'),
(152, 'Senegal', 17763163, 196712, '640px-Flag_of_Senegal.svg.png'),
(153, 'Serbia', 7149077, 88499, '640px-Flag_of_Serbia.svg.png'),
(154, 'Seychelles', 107660, 457, '640px-Flag_of_Seychelles.svg.png'),
(155, 'Sierra Leone', 8791092, 72300, '640px-Flag_of_Sierra_Leone.svg.png'),
(156, 'Singapore', 6014723, 736, '640px-Flag_of_Singapore.svg.png'),
(157, 'Slovakia', 5795199, 49035, '640px-Flag_of_Slovakia.svg.png'),
(158, 'Slovenia', 2119675, 20273, '640px-Flag_of_Slovenia.svg.png'),
(159, 'Somalia', 18143378, 637657, '640px-Flag_of_Somalia.svg.png'),
(160, 'South Africa', 60414495, 121090, '640px-Flag_of_South_Africa.svg.png'),
(161, ' South Korea', 51784059, 100432, '640px-Flag_of_South_Korea.svg.png'),
(162, 'South Sudan', 11088796, 644329, '640px-Flag_of_South_Sudan.svg.png'),
(163, 'Spain', 47519628, 505370, '640px-Flag_of_Spain.svg.png'),
(164, 'Sri Lanka', 21893579, 65610, '640px-Flag_of_Sri_Lanka.svg.png'),
(165, 'Sudan', 48109006, 1861484, '640px-Flag_of_Sudan.svg.png'),
(166, 'Suriname', 623236, 163820, '640px-Flag_of_Suriname.svg.png'),
(167, 'Sweden', 10612086, 450295, '640px-Flag_of_Sweden.svg.png'),
(168, 'Switzerland', 8796669, 41291, '480px-Flag_of_Switzerland.svg.png'),
(169, 'Syria', 23277014, 185180, '640px-Flag_of_Syria.svg.png'),
(170, 'Tajikistan', 10143543, 144100, '640px-Flag_of_Tajikistan.svg.png'),
(171, 'Tanzania', 67438106, 947303, '640px-Flag_of_Tanzania.svg.png'),
(172, 'Thailand', 71801279, 513120, '640px-Flag_of_Thailand.svg.png'),
(173, 'Togo', 9053799, 56785, '640px-Flag_of_Togo.svg.png'),
(174, 'Tonga', 107773, 747, '640px-Flag_of_Tonga.svg.png'),
(175, 'Trinidad and Tobago', 1534937, 5127, '640px-Flag_of_Trinidad_and_Tobago.svg.png'),
(176, 'Tunisia', 12458223, 163610, '640px-Flag_of_Tunisia.svg.png'),
(177, 'Turkey', 85816199, 783562, '640px-Flag_of_Turkey.svg.png'),
(178, 'Turkmenistan', 6516100, 488100, '640px-Flag_of_Turkmenistan.svg.png'),
(179, 'Tuvalu', 11396, 26, '640px-Flag_of_Tuvalu.svg.png'),
(180, 'Uganda', 48582334, 241550, '640px-Flag_of_Uganda.svg.png'),
(181, 'Ukraine', 36744634, 603550, '640px-Flag_of_Ukraine.svg.png'),
(182, 'United Arab Emirates', 9516871, 83600, '640px-Flag_of_the_United_Arab_Emirates.svg.png'),
(183, 'United Kingdom', 67736802, 244376, '640px-Flag_of_the_United_Kingdom_(1-2).svg.png'),
(184, 'United States', 339996563, 9525067, '640px-Flag_of_the_United_States.svg.png'),
(185, 'Uruguay', 3423108, 176215, 'Flag_of_Uruguay.svg'),
(186, 'Uzbekistan', 35163944, 447400, '640px-Flag_of_Uzbekistan.svg.png'),
(187, 'Vanuatu', 334506, 12189, '640px-Flag_of_Vanuatu_(official).svg.png'),
(188, 'Venezuela', 28838499, 912050, '640px-Flag_of_Venezuela.svg.png'),
(189, 'Vatican City', 518, 0, '480px-Flag_of_the_Vatican_City_(2023–present).svg.png'),
(190, 'Vietnam', 98858950, 331340, '640px-Flag_of_Vietnam.svg.png'),
(192, 'Zambia', 20569737, 752612, '640px-Flag_of_Zambia.svg.png'),
(193, 'Zimbabwe', 16665409, 390757, '640px-Flag_of_Zimbabwe.svg.png'),
(1914, 'Yemen', 34449825, 527968, '640px-Flag_of_Yemen.svg.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1915;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
