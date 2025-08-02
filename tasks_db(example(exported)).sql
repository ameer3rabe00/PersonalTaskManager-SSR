-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2025 at 10:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasks_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `user_id`, `name`) VALUES
(2, 1, 'SSRr'),
(3, 2, 'JS'),
(4, 2, 'react'),
(5, 1, 'React'),
(6, 1, 'C# DATA '),
(19, 1, 'IOT'),
(20, 1, 'Java');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `target_date` date DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `is_completed` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `description`, `target_date`, `category_id`, `is_completed`, `created_at`) VALUES
(1, 1, 'To do me', '2000-02-17', 2, 0, '2025-08-01 14:40:13'),
(2, 1, 'i love react ', '2025-08-10', 5, 0, '2025-08-01 14:42:11'),
(3, 1, 'js', '2025-02-01', 5, 0, '2025-08-01 15:24:54'),
(4, 1, 'asdsa', '2025-02-02', 2, 0, '2025-08-01 15:25:10'),
(5, 1, ' SSR IS GOOD', '2023-11-28', 5, 0, '2025-08-01 15:25:35'),
(6, 1, 'SSR ? ', '2025-08-25', 2, 0, '2025-08-01 15:26:12'),
(7, 1, 'JSSSSSSSSS', '2025-08-26', 5, 0, '2025-08-01 15:26:35'),
(8, 1, 'SADSAD', '2025-08-27', 2, 0, '2025-08-01 15:26:51'),
(9, 1, 'ASDASD', '2023-02-01', 2, 1, '2025-08-01 15:27:06'),
(10, 1, 'SDF', '2005-11-29', 5, 1, '2025-08-01 15:27:17'),
(11, 1, 'ASDASDSAD', '2001-02-05', 5, 1, '2025-08-01 15:27:29'),
(12, 1, 'asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', '2025-02-02', 5, 0, '2025-08-01 15:40:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `uname` varchar(50) DEFAULT NULL,
  `passwd` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tz` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `uname`, `passwd`, `email`, `tz`) VALUES
(1, 'ameer', 'ameer', 'f8903d9ac7fab9edd97cfb543ae546f9', 'ameere@a.com', '323'),
(2, 'me', 'you', '767815b882880afa72bc8857ebaecdd6', 'r@r.r', '323'),
(4, 'tesssst', 'test', '767815b882880afa72bc8857ebaecdd6', 'a@a.a', '323');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
