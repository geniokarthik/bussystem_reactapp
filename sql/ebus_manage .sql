-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 07:18 AM
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
-- Database: `ebus_manage`
--

-- --------------------------------------------------------

--
-- Table structure for table `bus`
--

CREATE TABLE `bus` (
  `bus_id` int(11) NOT NULL,
  `bus_name` varchar(10) DEFAULT NULL,
  `ins_datetime` datetime NOT NULL COMMENT '【登録日時】',
  `ins_user` int(11) NOT NULL COMMENT '【登録者】',
  `ins_action` varchar(100) NOT NULL COMMENT '【登録操作内容】',
  `upd_datetime` datetime NOT NULL COMMENT '【更新日時】登録時は更新、削除時は非更新',
  `upd_user` int(11) NOT NULL COMMENT '【更新者】登録時は更新、削除時は非更新',
  `upd_action` varchar(100) NOT NULL COMMENT '【更新操作内容】登録時は更新、削除時は非更新',
  `del_datetime` datetime DEFAULT NULL COMMENT '【削除日時】',
  `del_user` int(11) DEFAULT NULL COMMENT '【削除者】',
  `del_action` varchar(100) DEFAULT NULL COMMENT '【削除操作内容】',
  `del_flg` tinyint(4) NOT NULL DEFAULT 0 COMMENT '【削除フラグ】'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus`
--

INSERT INTO `bus` (`bus_id`, `bus_name`) VALUES
(1, '21'),
(2, 'B2'),
(3, 'B3');

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `route_id` int(11) NOT NULL,
  `bus_id` int(11) DEFAULT NULL,
  `origin` varchar(50) DEFAULT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `ins_datetime` datetime NOT NULL COMMENT '【登録日時】',
  `ins_user` int(11) NOT NULL COMMENT '【登録者】',
  `ins_action` varchar(100) NOT NULL COMMENT '【登録操作内容】',
  `upd_datetime` datetime NOT NULL COMMENT '【更新日時】登録時は更新、削除時は非更新',
  `upd_user` int(11) NOT NULL COMMENT '【更新者】登録時は更新、削除時は非更新',
  `upd_action` varchar(100) NOT NULL COMMENT '【更新操作内容】登録時は更新、削除時は非更新',
  `del_datetime` datetime DEFAULT NULL COMMENT '【削除日時】',
  `del_user` int(11) DEFAULT NULL COMMENT '【削除者】',
  `del_action` varchar(100) DEFAULT NULL COMMENT '【削除操作内容】',
  `del_flg` tinyint(4) NOT NULL DEFAULT 0 COMMENT '【削除フラグ】'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`route_id`, `bus_id`, `origin`, `destination`) VALUES
(1, 1, 'Kavindapadi', 'Bhavani'),
(2, 2, 'Bhavani', 'Perundurai'),
(3, 3, 'Perundurai', 'Bhavani');

-- --------------------------------------------------------

--
-- Table structure for table `routestops`
--

CREATE TABLE `routestops` (
  `route_stop_id` int(11) NOT NULL,
  `route_id` int(11) NOT NULL,
  `stop_id` int(11) NOT NULL,
  `stop_order` int(11) DEFAULT NULL,
  `ins_datetime` datetime NOT NULL COMMENT '【登録日時】',
  `ins_user` int(11) NOT NULL COMMENT '【登録者】',
  `ins_action` varchar(100) NOT NULL COMMENT '【登録操作内容】',
  `upd_datetime` datetime NOT NULL COMMENT '【更新日時】登録時は更新、削除時は非更新',
  `upd_user` int(11) NOT NULL COMMENT '【更新者】登録時は更新、削除時は非更新',
  `upd_action` varchar(100) NOT NULL COMMENT '【更新操作内容】登録時は更新、削除時は非更新',
  `del_datetime` datetime DEFAULT NULL COMMENT '【削除日時】',
  `del_user` int(11) DEFAULT NULL COMMENT '【削除者】',
  `del_action` varchar(100) DEFAULT NULL COMMENT '【削除操作内容】',
  `del_flg` tinyint(4) NOT NULL DEFAULT 0 COMMENT '【削除フラグ】'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routestops`
--

INSERT INTO `routestops` (`route_stop_id`, `route_id`, `stop_id`, `stop_order`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5),
(6, 1, 6, 6),
(7, 1, 7, 7),
(8, 1, 8, 8),
(9, 1, 9, 9),
(10, 1, 10, 10),
(11, 2, 6, 5),
(12, 2, 7, 4),
(13, 2, 8, 3),
(14, 2, 9, 2),
(15, 2, 10, 1),
(16, 2, 11, 6),
(17, 2, 12, 7),
(18, 2, 13, 8),
(19, 2, 14, 9),
(20, 3, 14, 1),
(21, 3, 13, 2),
(22, 3, 12, 3),
(23, 3, 11, 4),
(24, 3, 6, 5),
(25, 3, 7, 6),
(26, 3, 8, 7),
(27, 3, 9, 8),
(28, 3, 10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `stop_id` int(11) NOT NULL,
  `departure_time` time NOT NULL,
  `trip_number` int(11) NOT NULL,
  `arrival_time` time DEFAULT NULL,
  `ins_datetime` datetime NOT NULL COMMENT '【登録日時】',
  `ins_user` int(11) NOT NULL COMMENT '【登録者】',
  `ins_action` varchar(100) NOT NULL COMMENT '【登録操作内容】',
  `upd_datetime` datetime NOT NULL COMMENT '【更新日時】登録時は更新、削除時は非更新',
  `upd_user` int(11) NOT NULL COMMENT '【更新者】登録時は更新、削除時は非更新',
  `upd_action` varchar(100) NOT NULL COMMENT '【更新操作内容】登録時は更新、削除時は非更新',
  `del_datetime` datetime DEFAULT NULL COMMENT '【削除日時】',
  `del_user` int(11) DEFAULT NULL COMMENT '【削除者】',
  `del_action` varchar(100) DEFAULT NULL COMMENT '【削除操作内容】',
  `del_flg` tinyint(4) NOT NULL DEFAULT 0 COMMENT '【削除フラグ】'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `bus_id`, `stop_id`, `departure_time`, `trip_number`, `arrival_time`) VALUES
(1, 1, 1, '08:00:00', 1, '07:55:00'),
(2, 1, 2, '08:10:00', 1, '08:05:00'),
(3, 1, 3, '08:20:00', 1, '08:15:00'),
(4, 1, 4, '08:30:00', 1, '08:25:00'),
(5, 1, 5, '08:40:00', 1, '08:35:00'),
(6, 1, 6, '08:50:00', 1, '08:45:00'),
(7, 1, 7, '09:00:00', 1, '08:55:00'),
(8, 1, 8, '09:10:00', 1, '09:05:00'),
(9, 1, 9, '09:20:00', 1, '09:15:00'),
(10, 1, 10, '09:30:00', 1, '09:25:00'),
(11, 1, 1, '09:05:00', 2, '09:00:00'),
(12, 1, 2, '09:15:00', 2, '09:10:00'),
(13, 1, 3, '09:25:00', 2, '09:20:00'),
(14, 1, 4, '09:35:00', 2, '09:30:00'),
(15, 1, 5, '09:45:00', 2, '09:40:00'),
(16, 1, 6, '09:55:00', 2, '09:50:00'),
(17, 1, 7, '10:05:00', 2, '10:00:00'),
(18, 1, 8, '10:15:00', 2, '10:10:00'),
(19, 1, 9, '10:25:00', 2, '10:20:00'),
(20, 1, 10, '10:35:00', 2, '10:30:00'),
(21, 2, 10, '09:05:00', 1, '09:00:00'),
(22, 2, 9, '09:15:00', 1, '09:10:00'),
(23, 2, 8, '09:25:00', 1, '09:20:00'),
(24, 2, 7, '09:35:00', 1, '09:30:00'),
(25, 2, 6, '09:45:00', 1, '09:40:00'),
(26, 2, 11, '09:55:00', 1, '09:50:00'),
(27, 2, 12, '10:05:00', 1, '10:00:00'),
(28, 2, 13, '10:15:00', 1, '10:10:00'),
(29, 2, 14, '10:25:00', 1, '10:20:00'),
(30, 2, 10, '10:05:00', 2, '10:00:00'),
(31, 2, 9, '10:15:00', 2, '10:10:00'),
(32, 2, 8, '10:25:00', 2, '10:20:00'),
(33, 2, 7, '10:35:00', 2, '10:30:00'),
(34, 2, 6, '10:45:00', 2, '10:40:00'),
(35, 2, 11, '10:55:00', 2, '10:50:00'),
(36, 2, 12, '11:05:00', 2, '11:00:00'),
(39, 2, 13, '11:15:00', 2, '11:10:00'),
(40, 2, 14, '11:25:00', 2, '11:20:00'),
(41, 3, 14, '08:00:00', 1, '07:55:00'),
(42, 3, 13, '08:10:00', 1, '08:05:00'),
(43, 3, 12, '08:20:00', 1, '08:15:00'),
(44, 3, 11, '08:30:00', 1, '08:25:00'),
(45, 3, 6, '10:40:00', 1, '10:35:00'),
(46, 3, 7, '08:50:00', 1, '08:45:00'),
(47, 3, 8, '09:00:00', 1, '08:55:00'),
(48, 3, 9, '09:10:00', 1, '09:05:00'),
(49, 3, 10, '09:20:00', 1, '09:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `stops`
--

CREATE TABLE `stops` (
  `stop_id` int(11) NOT NULL,
  `stop_name` varchar(50) DEFAULT NULL,
  `ins_datetime` datetime NOT NULL COMMENT '【登録日時】',
  `ins_user` int(11) NOT NULL COMMENT '【登録者】',
  `ins_action` varchar(100) NOT NULL COMMENT '【登録操作内容】',
  `upd_datetime` datetime NOT NULL COMMENT '【更新日時】登録時は更新、削除時は非更新',
  `upd_user` int(11) NOT NULL COMMENT '【更新者】登録時は更新、削除時は非更新',
  `upd_action` varchar(100) NOT NULL COMMENT '【更新操作内容】登録時は更新、削除時は非更新',
  `del_datetime` datetime DEFAULT NULL COMMENT '【削除日時】',
  `del_user` int(11) DEFAULT NULL COMMENT '【削除者】',
  `del_action` varchar(100) DEFAULT NULL COMMENT '【削除操作内容】',
  `del_flg` tinyint(4) NOT NULL DEFAULT 0 COMMENT '【削除フラグ】'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stops`
--

INSERT INTO `stops` (`stop_id`, `stop_name`) VALUES
(10, 'Bhavani'),
(12, 'Ellispettai'),
(9, 'Kalingkarayanpalayam'),
(13, 'Kanjikovil'),
(1, 'Kavindapadi'),
(4, 'Kunnathurankadai'),
(8, 'Moovendarnagar'),
(6, 'Periyapuliyur'),
(14, 'Perundurai'),
(7, 'Pulappalayam'),
(2, 'Salankapalayam'),
(3, 'Sulaimedu'),
(11, 'Thairpalayam'),
(5, 'Uppukaranpalayam');

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `transfer_id` int(11) NOT NULL,
  `from_route_id` int(11) DEFAULT NULL,
  `to_route_id` int(11) DEFAULT NULL,
  `transfer_stop_id` int(11) DEFAULT NULL,
  `ins_datetime` datetime NOT NULL COMMENT '【登録日時】',
  `ins_user` int(11) NOT NULL COMMENT '【登録者】',
  `ins_action` varchar(100) NOT NULL COMMENT '【登録操作内容】',
  `upd_datetime` datetime NOT NULL COMMENT '【更新日時】登録時は更新、削除時は非更新',
  `upd_user` int(11) NOT NULL COMMENT '【更新者】登録時は更新、削除時は非更新',
  `upd_action` varchar(100) NOT NULL COMMENT '【更新操作内容】登録時は更新、削除時は非更新',
  `del_datetime` datetime DEFAULT NULL COMMENT '【削除日時】',
  `del_user` int(11) DEFAULT NULL COMMENT '【削除者】',
  `del_action` varchar(100) DEFAULT NULL COMMENT '【削除操作内容】',
  `del_flg` tinyint(4) NOT NULL DEFAULT 0 COMMENT '【削除フラグ】'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`transfer_id`, `from_route_id`, `to_route_id`, `transfer_stop_id`) VALUES
(1, 1, 2, 6),
(2, 3, 1, 6),
(3, 1, 2, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`bus_id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`route_id`),
  ADD KEY `bus_id` (`bus_id`);

--
-- Indexes for table `routestops`
--
ALTER TABLE `routestops`
  ADD PRIMARY KEY (`route_stop_id`),
  ADD KEY `stop_id` (`stop_id`),
  ADD KEY `routestops_ibfk_1` (`route_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `bus_id` (`bus_id`),
  ADD KEY `stop_id` (`stop_id`);

--
-- Indexes for table `stops`
--
ALTER TABLE `stops`
  ADD PRIMARY KEY (`stop_id`),
  ADD UNIQUE KEY `stop_name` (`stop_name`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `from_route_id` (`from_route_id`),
  ADD KEY `to_route_id` (`to_route_id`),
  ADD KEY `transfer_stop_id` (`transfer_stop_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `routestops`
--
ALTER TABLE `routestops`
  MODIFY `route_stop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`);

--
-- Constraints for table `routestops`
--
ALTER TABLE `routestops`
  ADD CONSTRAINT `routestops_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`),
  ADD CONSTRAINT `routestops_ibfk_2` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`stop_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`stop_id`);

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`from_route_id`) REFERENCES `routes` (`route_id`),
  ADD CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`to_route_id`) REFERENCES `routes` (`route_id`),
  ADD CONSTRAINT `transfer_ibfk_3` FOREIGN KEY (`transfer_stop_id`) REFERENCES `stops` (`stop_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
