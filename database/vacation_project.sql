-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 22, 2025 at 03:57 PM
-- Server version: 9.4.0
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_project`
--
CREATE DATABASE IF NOT EXISTS `vacation_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vacation_project`;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
(39, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'ec1251c1-00fb-43e2-aaa8-02a142a27a94', '2025-11-21 14:40:48', '2025-11-21 14:40:48'),
(42, '66a02a73-6a6b-4023-acff-5c2add091cd4', '6e71ea0c-3d63-4109-89da-a8321e9823f2', '2025-11-22 11:52:57', '2025-11-22 11:52:57'),
(44, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'd88d5764-142f-426f-a3d1-cb4e303ba60b', '2025-11-22 11:53:01', '2025-11-22 11:53:01'),
(45, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'be2d18c9-3944-4296-8d24-f690f6041386', '2025-11-22 11:53:02', '2025-11-22 11:53:02'),
(47, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', 'ca67cbe4-300e-44bd-9dda-b9aa7b1475ea', '2025-11-22 11:54:13', '2025-11-22 11:54:13'),
(48, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', '9cfc4bed-21f2-4c86-8513-8d77c05cef23', '2025-11-22 11:54:15', '2025-11-22 11:54:15'),
(49, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', 'ec1251c1-00fb-43e2-aaa8-02a142a27a94', '2025-11-22 11:54:16', '2025-11-22 11:54:16'),
(50, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', 'a1ace5c5-84a3-4fa3-89c6-b92d11f6bdb7', '2025-11-22 11:54:18', '2025-11-22 11:54:18'),
(51, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', '3b82343c-2711-49ef-b27a-18a856b9fb2e', '2025-11-22 11:54:21', '2025-11-22 11:54:21'),
(52, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', '7ad0c475-db0d-445a-8293-0bfd1a44d2d3', '2025-11-22 11:54:23', '2025-11-22 11:54:23'),
(53, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', 'd93a8fec-8b92-4db4-8619-a356fa177ca2', '2025-11-22 11:54:24', '2025-11-22 11:54:24'),
(54, 'abf74d49-7b3b-41b5-a61e-1a20624d9982', '6e71ea0c-3d63-4109-89da-a8321e9823f2', '2025-11-22 11:54:25', '2025-11-22 11:54:25'),
(55, '21d89f18-3dbc-4316-ab8b-d6888159463c', 'ec1251c1-00fb-43e2-aaa8-02a142a27a94', '2025-11-22 11:54:42', '2025-11-22 11:54:42'),
(56, '21d89f18-3dbc-4316-ab8b-d6888159463c', '6e71ea0c-3d63-4109-89da-a8321e9823f2', '2025-11-22 11:54:47', '2025-11-22 11:54:47'),
(57, '21d89f18-3dbc-4316-ab8b-d6888159463c', '7ad0c475-db0d-445a-8293-0bfd1a44d2d3', '2025-11-22 11:54:48', '2025-11-22 11:54:48'),
(58, '21d89f18-3dbc-4316-ab8b-d6888159463c', '3b82343c-2711-49ef-b27a-18a856b9fb2e', '2025-11-22 11:54:50', '2025-11-22 11:54:50'),
(59, '21d89f18-3dbc-4316-ab8b-d6888159463c', 'd88d5764-142f-426f-a3d1-cb4e303ba60b', '2025-11-22 11:54:52', '2025-11-22 11:54:52'),
(60, '21d89f18-3dbc-4316-ab8b-d6888159463c', '0ab95374-d66f-4162-9784-d5cc13f08732', '2025-11-22 11:54:54', '2025-11-22 11:54:54'),
(61, '21d89f18-3dbc-4316-ab8b-d6888159463c', '9cfc4bed-21f2-4c86-8513-8d77c05cef23', '2025-11-22 11:54:56', '2025-11-22 11:54:56'),
(62, '21d89f18-3dbc-4316-ab8b-d6888159463c', 'c0241ec2-0b7f-47dd-a20c-ea5a4c359c3f', '2025-11-22 11:54:59', '2025-11-22 11:54:59'),
(66, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'c0241ec2-0b7f-47dd-a20c-ea5a4c359c3f', '2025-11-22 14:07:40', '2025-11-22 14:07:40'),
(68, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'a1ace5c5-84a3-4fa3-89c6-b92d11f6bdb7', '2025-11-22 15:53:24', '2025-11-22 15:53:24'),
(69, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'd93a8fec-8b92-4db4-8619-a356fa177ca2', '2025-11-22 15:53:26', '2025-11-22 15:53:26'),
(70, '66a02a73-6a6b-4023-acff-5c2add091cd4', 'ca67cbe4-300e-44bd-9dda-b9aa7b1475ea', '2025-11-22 15:55:57', '2025-11-22 15:55:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
('21d89f18-3dbc-4316-ab8b-d6888159463c', 'Idan', 'Rashon', 'idan@example.com', '$argon2id$v=19$m=32768,t=3,p=1$dszi/Sclb428uVx94rOlUQ$cnFqNQmJQTYylSo9PEucY3O3Dc7bhP07J1S4Yh8Bqtg', 'user', '2025-11-17 19:11:43', '2025-11-17 19:11:43'),
('66a02a73-6a6b-4023-acff-5c2add091cd4', 'Pavel', 'Tester', 'mike@example.com', '$argon2id$v=19$m=32768,t=3,p=1$QrvHAr9FNR803PHT+2xG8w$G3Fg+8oMXzfwyXfiPJqXdx/TjYmDfs5YeNv3p3kZQPU', 'user', '2025-11-10 19:03:55', '2025-11-10 19:03:55'),
('abf74d49-7b3b-41b5-a61e-1a20624d9982', 'Idan', 'Rashon', 'ida1n@example.com', '$argon2id$v=19$m=32768,t=3,p=1$by8PJGHyJuKdq0+zJzLAbQ$gJW/cDfwlClmZT2ldWO5HTn/T6Py9j130u49jDya4jg', 'user', '2025-11-21 10:27:28', '2025-11-21 10:27:28'),
('edc32fd2-fa6d-49c0-8c35-285e7a3acd31', 'Admin', 'User', 'admin@example.com', '$argon2id$v=19$m=32768,t=3,p=1$SGYY1Q3hGg/81SQO8lheew$q94HIrVjrM4u9CxAXb6UbLN1IcxtE89+Ws+c+NaVDKc', 'admin', '2025-11-15 09:17:27', '2025-11-15 09:17:27');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(120) NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image_name` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_name`, `created_at`, `updated_at`) VALUES
('0ab95374-d66f-4162-9784-d5cc13f08732', 'Japan - Tokyo', 'Experience neon streets, visit ancient temples and try sushi at local markets.', '2026-01-10 00:00:00', '2026-01-15 00:00:00', 2850.00, 'http://localhost:4566/vacations-images/89dec0a1-4cde-4d5e-80f1-d12287247f4c.jpg', '2025-11-22 11:49:41', '2025-11-22 11:49:41'),
('3b82343c-2711-49ef-b27a-18a856b9fb2e', 'Thailand - Phuket', 'Relax on tropical beaches, take island-hopping tours and enjoy Thai street food.', '2026-03-07 00:00:00', '2026-03-11 00:00:00', 1250.00, 'http://localhost:4566/vacations-images/5a06f6d4-3dc9-422d-b7ef-cf03439c929b.jpg', '2025-11-22 11:48:46', '2025-11-22 11:48:46'),
('6e71ea0c-3d63-4109-89da-a8321e9823f2', 'Germany - Berlin', 'See the Brandenburg Gate, the Berlin Wall memorial and enjoy the local nightlife.', '2026-06-07 00:00:00', '2026-06-10 00:00:00', 990.00, 'http://localhost:4566/vacations-images/0e70749c-c1a8-47dd-b8d8-2120ff26bc73.jpg', '2025-11-22 11:47:41', '2025-11-22 14:09:51'),
('7ad0c475-db0d-445a-8293-0bfd1a44d2d3', 'Greece - Santorini', 'njoy stunning sunsets, white-blue houses and crystal-clear Aegean Sea views', '2026-08-10 00:00:00', '2026-08-15 00:00:00', 1150.00, 'http://localhost:4566/vacations-images/81e9b75a-96fd-408d-9f53-17c89767fb2f.jpeg', '2025-11-22 11:44:09', '2025-11-22 11:44:09'),
('9cfc4bed-21f2-4c86-8513-8d77c05cef23', 'Italy - Rome', 'Explore ancient Rome: walk through the Colosseum and Roman Forum, visit the Vatican, and enjoy authentic Italian pasta and gelato in charming streets.', '2026-01-01 00:00:00', '2026-01-05 00:00:00', 1200.00, 'http://localhost:4566/vacations-images/7b3809a0-8646-4c7b-8e33-6525aba26c46.jpg', '2025-11-21 14:16:44', '2025-11-21 14:16:44'),
('a1ace5c5-84a3-4fa3-89c6-b92d11f6bdb7', 'Portugal - Lisbon', 'Ride historic trams, taste pastel de nata and explore the old Alfama district.', '2026-03-01 00:00:00', '2026-03-05 00:00:00', 1500.00, 'http://localhost:4566/vacations-images/8bb51f4b-3a1c-4972-ad73-e0066a7e56eb.jpg', '2025-11-22 11:45:22', '2025-11-22 11:45:22'),
('be2d18c9-3944-4296-8d24-f690f6041386', 'Spain - Barcelona', 'Walk along La Rambla, visit Sagrada Família and relax on the Mediterranean beaches.', '2026-05-05 00:00:00', '2026-05-11 00:00:00', 1050.00, 'http://localhost:4566/vacations-images/9db5fbc2-4ed3-4298-8f7f-a1d8c453fd82.jpg', '2025-11-22 11:41:51', '2025-11-22 11:41:51'),
('c0241ec2-0b7f-47dd-a20c-ea5a4c359c3f', 'Netherlands - Amsterdam', 'Discover canal streets, visit the Van Gogh Museum and rent a bike to explore the city.', '2025-12-29 00:00:00', '2026-01-04 00:00:00', 1500.00, 'http://localhost:4566/vacations-images/d3436eac-5671-4dfb-81b0-96a590a8ef83.jpg', '2025-11-22 11:46:28', '2025-11-22 11:46:28'),
('ca67cbe4-300e-44bd-9dda-b9aa7b1475ea', 'France - Paris', 'Climb the Eiffel Tower, stroll along the Seine and visit the Louvre Museum.', '2025-12-20 00:00:00', '2026-12-24 00:00:00', 1250.00, 'http://localhost:4566/vacations-images/459100e5-98bc-47c7-8218-839698bbf653.jpeg', '2025-11-22 11:42:56', '2025-11-22 11:42:56'),
('d88d5764-142f-426f-a3d1-cb4e303ba60b', 'USA - New York', 'See Times Square, Central Park, the Statue of Liberty and enjoy Broadway shows.', '2026-05-10 00:00:00', '2026-05-15 00:00:00', 1940.00, 'http://localhost:4566/vacations-images/afe8e80d-0687-460e-8a39-b1107f44517e.jpg', '2025-11-22 11:51:01', '2025-11-22 11:51:01'),
('d93a8fec-8b92-4db4-8619-a356fa177ca2', 'Switzerland - Zurich', 'Enjoy peaceful lakeside walks, visit the old town and take a day trip to the Swiss Alps for breathtaking mountain views.', '2026-07-27 00:00:00', '2026-07-31 00:00:00', 1250.00, 'http://localhost:4566/vacations-images/ce8b35e6-1df7-443f-9bf1-379aa5f65650.jpg', '2025-11-22 11:52:23', '2025-11-22 11:52:23'),
('ec1251c1-00fb-43e2-aaa8-02a142a27a94', 'Hungary - Budapest', 'Discover the charm of Budapest — a city of bridges, thermal baths, and glowing night views. Walk along the Danube, enjoy the stunning architecture, and feel the rich European history in every corner.', '2025-11-19 00:00:00', '2025-11-22 00:00:00', 1000.00, 'http://localhost:4566/vacations-images/11515c3c-cc80-4cb1-bafa-88c03cae8282.jpeg', '2025-11-10 19:04:05', '2025-11-22 15:56:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_vacation` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
