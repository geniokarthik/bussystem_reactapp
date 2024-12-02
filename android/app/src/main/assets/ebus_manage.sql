BEGIN TRANSACTION;

CREATE TABLE bus (
    bus_id INTEGER PRIMARY KEY,
    bus_name TEXT,
    ins_datetime TEXT NULL,
    ins_user INTEGER NULL,
    ins_action TEXT NULL,
    upd_datetime TEXT NULL,
    upd_user INTEGER NULL,
    upd_action TEXT NULL,
    del_datetime TEXT,
    del_user INTEGER,
    del_action TEXT,
    del_flg INTEGER NULL DEFAULT 0
);

INSERT INTO `bus` (`bus_id`, `bus_name`) VALUES
(1, '21'),
(2, 'B2'),
(3, 'B3');

CREATE TABLE routes (
    route_id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_id INTEGER,
    origin TEXT,
    destination TEXT,
    ins_datetime TEXT NULL,
    ins_user INTEGER NULL,
    ins_action TEXT NULL,
    upd_datetime TEXT NULL,
    upd_user INTEGER NULL,
    upd_action TEXT NULL,
    del_datetime TEXT,
    del_user INTEGER,
    del_action TEXT,
    del_flg INTEGER NULL DEFAULT 0,
    FOREIGN KEY (bus_id) REFERENCES bus (bus_id)
);


INSERT INTO `routes` (`route_id`, `bus_id`, `origin`, `destination`) VALUES
(1, 1, 'Kavindapadi', 'Bhavani'),
(2, 2, 'Bhavani', 'Perundurai'),
(3, 3, 'Perundurai', 'Bhavani');


CREATE TABLE routestops (
    route_stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NULL,
    stop_id INTEGER NULL,
    stop_order INTEGER,
    ins_datetime TEXT NULL,
    ins_user INTEGER NULL,
    ins_action TEXT NULL,
    upd_datetime TEXT NULL,
    upd_user INTEGER NULL,
    upd_action TEXT NULL,
    del_datetime TEXT,
    del_user INTEGER,
    del_action TEXT,
    del_flg INTEGER NULL DEFAULT 0,
    FOREIGN KEY (route_id) REFERENCES routes (route_id),
    FOREIGN KEY (stop_id) REFERENCES stops (stop_id)
);

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

CREATE TABLE schedule (
    schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_id INTEGER NULL,
    stop_id INTEGER NULL,
    departure_time TEXT NULL,
    trip_number INTEGER NULL,
    arrival_time TEXT,
    ins_datetime TEXT NULL,
    ins_user INTEGER NULL,
    ins_action TEXT NULL,
    upd_datetime TEXT NULL,
    upd_user INTEGER NULL,
    upd_action TEXT NULL,
    del_datetime TEXT,
    del_user INTEGER,
    del_action TEXT,
    del_flg INTEGER NULL DEFAULT 0,
    FOREIGN KEY (bus_id) REFERENCES bus (bus_id),
    FOREIGN KEY (stop_id) REFERENCES stops (stop_id)
);

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

CREATE TABLE stops (
    stop_id INTEGER PRIMARY KEY,
    stop_name TEXT,
    ins_datetime TEXT NULL,
    ins_user INTEGER NULL,
    ins_action TEXT NULL,
    upd_datetime TEXT NULL,
    upd_user INTEGER NULL,
    upd_action TEXT NULL,
    del_datetime TEXT,
    del_user INTEGER,
    del_action TEXT,
    del_flg INTEGER NULL DEFAULT 0
);

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

CREATE TABLE transfer (
    transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_route_id INTEGER,
    to_route_id INTEGER,
    transfer_stop_id INTEGER,
    ins_datetime TEXT NULL,
    ins_user INTEGER NULL,
    ins_action TEXT NULL,
    upd_datetime TEXT NULL,
    upd_user INTEGER NULL,
    upd_action TEXT NULL,
    del_datetime TEXT,
    del_user INTEGER,
    del_action TEXT,
    del_flg INTEGER NULL DEFAULT 0,
    FOREIGN KEY (from_route_id) REFERENCES routes (route_id),
    FOREIGN KEY (to_route_id) REFERENCES routes (route_id),
    FOREIGN KEY (transfer_stop_id) REFERENCES stops (stop_id)
);

INSERT INTO `transfer` (`transfer_id`, `from_route_id`, `to_route_id`, `transfer_stop_id`) VALUES
(1, 1, 2, 6),
(2, 3, 1, 6),
(3, 1, 2, 10);

COMMIT;