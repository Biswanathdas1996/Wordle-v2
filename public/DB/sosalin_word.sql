-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 09, 2022 at 08:35 AM
-- Server version: 5.7.37
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sosalin_word`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `session_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `attempt` varchar(255) DEFAULT NULL,
  `correct_attempt` varchar(255) DEFAULT '0',
  `time` varchar(255) DEFAULT NULL COMMENT 'in Second'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `session_id`, `user_id`, `question_id`, `attempt`, `correct_attempt`, `time`) VALUES
(1, 8, 5, 16, '[\"XYPATH\",\"UNITED\",\"UIPATH\"]', '3', '181'),
(2, 8, 5, 17, '[\"PWCASSISST\"]', '1', '154');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `session_id` int(11) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT '0',
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `new_start_time` datetime DEFAULT NULL,
  `new_end_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `session_id`, `question`, `answer`, `status`, `start_time`, `end_time`, `new_start_time`, `new_end_time`) VALUES
(1, 1, 'An insurance company representative who provides service to the policyholder for the insurer.', 'AGENT', '0', NULL, NULL, NULL, NULL),
(2, 1, 'The person whose life is covered by a policy of insurance.', 'INSURED', '0', NULL, NULL, NULL, NULL),
(3, 1, 'The date upon which the face amount of a life insurance policy is paid to the policyholder.', 'MATURITY', '0', NULL, NULL, NULL, NULL),
(4, 1, 'The obligation assumed by the insurer when it issues a policy.', 'RISK', '0', NULL, NULL, NULL, NULL),
(5, 1, 'The scope of protection provided under a contract of insurance.', 'COVERAGE', '0', NULL, NULL, NULL, NULL),
(6, 2, 'Bill of Exchange drawn on a specified banker ordering the banker to pay a certain sum of money to the drawer', 'CHEQUE', '0', NULL, NULL, NULL, NULL),
(7, 2, 'A person who takes some money on loan from another person', 'DEBTOR', '0', NULL, NULL, NULL, NULL),
(8, 2, 'A bailment of goods as security for payment of a debt or performance of a promise', 'PLEDGE', '0', NULL, NULL, NULL, NULL),
(9, 2, 'When a material alteration is made on a document or a Negotiable Instrument like a cheque', 'FROGERY', '0', NULL, NULL, NULL, NULL),
(10, 2, 'Centralised clearing service that aims at providing interbank high volume, low value transactions that are repetitive and periodic in nature.', 'NACH', '0', NULL, NULL, NULL, NULL),
(11, 3, 'A fixed-income instrument that represents a loan made by an investor to a borrower', 'BOND', '0', NULL, NULL, NULL, NULL),
(12, 3, 'Decline of purchasing power of a given currency over time', 'INFLATION', '0', NULL, NULL, NULL, NULL),
(13, 3, 'A small, temporary, stand-alone booth used in high-traffic areas for marketing purposes.', 'KIOSK', '0', NULL, NULL, NULL, NULL),
(14, 3, 'Ongoing business expenses not directly attributed to creating a product or service.', 'OVERHEAD', '0', NULL, NULL, NULL, NULL),
(16, 8, 'Who is the Strategic Alliance partner for PwC s Intelligent Automation Team ?', 'uipath', '2', '1649410956', '1649411140.8', '2022-04-08 15:12:36', '2022-04-08 15:15:36'),
(17, 8, 'Whats the name of the chatbot available on our PwC laptops & Intranet?', 'PwCAssisst', '1', '1649411208', '1649411392.8', '2022-04-08 15:16:48', '2022-04-08 15:19:48'),
(18, 9, 'What does \"T\" represent in the acronym GIFT?', 'teccity', '0', NULL, NULL, NULL, NULL),
(19, 9, 'Which Financial Services regulator regulates financial services units in GIFT City?', 'IFSCA', '0', NULL, NULL, NULL, NULL),
(20, 9, 'Name the financial product that banks are allowed to trade in the India onshore market provided they have a GIFT-IFSC Branch?', 'NDF', '0', NULL, NULL, NULL, NULL),
(21, 8, 'What is the name of a web based Intelligent Automation knowledge management platform that offers some of the pre-built bots, thought papers, Heatmaps ?', 'IAgallery', '0', NULL, NULL, NULL, NULL),
(22, 5, 'What approx. percentage  of the 1200 captives in India, are FS focussed (as per an Economic Times, 2020 report)?', 'Forty', '0', NULL, NULL, NULL, NULL),
(23, 5, 'Name a key GTM approach for FY 23 involving small-group conversations with CFOs for co-creating transformation roadmaps', 'CFOLab', '0', NULL, NULL, NULL, NULL),
(24, 6, 'In the context of sustainable finance, name the classification system to identify activities/assets or projects that deliver on key climate, green, social or sustainable objectives', 'Taxonomy', '0', NULL, NULL, NULL, NULL),
(25, 6, 'The use of influence by investors to maximise overall long term value, including the value of common economic, social and environmental aspects.', 'Stewardship', '0', NULL, NULL, NULL, NULL),
(26, 6, 'The concept of Circular Economy has been popularised by this person who was the world\"s fastest solo sailor in 2005, and realised the challenges of working with only finite resources (first name only)', 'Ellen', '0', NULL, NULL, NULL, NULL),
(27, 11, '	A specialized fixed point business unit / hub hosting certain minimum digital infrastructure for delivering digital banking products and services is called as â€¦â€¦â€¦..(name the acronym)', 'DBU', '0', NULL, NULL, NULL, NULL),
(28, 11, 'Each Digital Banking Unit needs to headed by a senior and experienced excecutive of the bank. Such executive will designated asâ€¦..? (name the designation)', 'COO', '0', NULL, NULL, NULL, NULL),
(29, 11, 'Who is responsible to review the banks progress and KPIs of digital banking services ?', 'Board', '0', NULL, NULL, NULL, NULL),
(30, 12, 'Three non-FS sectors shared best practices (i) Heathcare (ii)PE and (iii)...â€¦.........? Name the third non-FS sector', 'Automotive', '0', NULL, NULL, NULL, NULL),
(31, 12, '	Who is the sector lead for PE (last name only)', 'Kapur', '0', NULL, NULL, NULL, NULL),
(32, 12, '	Who is the sector lead for Automotive (last name only)', 'Mukhtyar', '0', NULL, NULL, NULL, NULL),
(33, 9, 'GIFT City is located in which district of Gujrat?', 'Gandhinagar', '0', NULL, NULL, NULL, NULL),
(34, 10, 'Which month of the year 2021, Research Institute was conceptualised?', 'August', '0', NULL, NULL, NULL, NULL),
(35, 10, 'Different outcomes of Account Research carry different levels of analysis and data. What are these levels called?', 'Tiers', '0', NULL, NULL, NULL, NULL),
(36, 10, 'What is the most basic level of Account Research called?', 'Primer', '0', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `session_name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `session_name`, `status`) VALUES
(1, 'Insurance', 1),
(2, 'Banking', 1),
(3, 'Investment', 1),
(5, 'Finance Transformation - GTM', 1),
(6, 'ESG GTM', 1),
(7, 'Circular Economy', 1),
(8, 'Intelligent Automation', 1),
(9, 'GIFT City', 1),
(10, 'PwC Research Institute', 1),
(11, 'Digital Banking Units', 1),
(12, 'Learning from Non-FS sectors', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `session_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `contact_number`, `session_id`) VALUES
(1, 'shree Pandit', '9953152917', NULL),
(2, 'Joydeep', '9821611173', NULL),
(3, 'Biswanath Das', '8001691299', NULL),
(5, 'Vinit Acharya', '7208108017', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
