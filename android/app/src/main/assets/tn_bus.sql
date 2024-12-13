BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS bus (
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

CREATE TABLE IF NOT EXISTS routes (
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


CREATE TABLE IF NOT EXISTS routestops (
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

CREATE TABLE IF NOT EXISTS schedule (
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

CREATE TABLE IF NOT EXISTS stops (
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

--
-- Dumping data for table `stops`
--
CREATE TABLE IF NOT EXISTS transfer (
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

--
-- Dumping data for table `stops`
--

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone INTEGER,
    email_verified_at TEXT NULL,
    remember_token TEXT NULL,
    created_at TEXT NULL,
    updated_at TEXT NULL
);


INSERT INTO users ( name, email, password, phone, email_verified_at, remember_token, created_at, updated_at) VALUES
( 'siva', 'siva@gmail.com', '12345', NULL, NULL, NULL, '2024-11-15 10:06:25', '2024-11-15 10:06:25'),
( 'siva', 'sivaraj@gmail.com', '12345', NULL, NULL, NULL, '2024-11-15 10:06:41', '2024-11-15 10:06:41'),
( 'John Doe', 'johndoe@example.com', '$2y$12$zJmXav10Aus/a0IneCGCPOjvbPKC0ddsUIpCAzvu9TBHegSu/8eo.', NULL, NULL, NULL, '2024-11-18 05:05:25', '2024-11-18 05:05:25'),
( 'John Dohe', 'johndoe@exyyample.com', '$2y$12$v9nFiA6.y7YOucugSx456uEYjBIaoBGmfR4PQCiOKO3OSXzbjuKF6', NULL, NULL, NULL, '2024-11-18 05:53:10', '2024-11-18 05:53:10'),
( 'John Ddohe', 'johndode@exyyample.com', '$2y$12$m8sxQbqhpzH7mTTooE4EN.Y3QTpwmcwkjgg4Rox05ZB6NPdBWNuI.', NULL, NULL, NULL, '2024-11-18 05:54:13', '2024-11-18 05:54:13'),
( 'Jtjkohn Ddohgjhytjtytye', 'johndode@eetgrhxyyample.com', '$2y$12$mqtH6bM2L8z9hZs8pbwJm.UOuhZ/QjZLtnD3/YzdiPCb0UV0PqtpG', NULL, NULL, NULL, '2024-11-18 05:56:22', '2024-11-18 05:56:22'),
( 'test Doe', 'test@example.com', '$2y$12$6YhnwhEjDoadgwcXR.ePgeFJ6Yt1vHyRPDbbWNnAY/SgvcolEjzx2', NULL, NULL, NULL, '2024-11-18 06:16:20', '2024-11-18 06:16:20'),
( 'testrf', 'sibyu@gmail.com', '$2y$12$9cnt.j8mqncI.5RGv44BWepRFpJn7L8L1jK98yBQgfR9hIZStq/cC', NULL, NULL, NULL, '2024-11-18 06:52:28', '2024-11-18 06:52:28'),
( 'testrf', 'sibghgdyu@gmail.com', '$2y$12$yQJ9OdatN6muUPrvs5eZNuRs53rMzHTZ53PLN/0pcHv0/i8VzfxsG', NULL, NULL, NULL, '2024-11-18 07:31:11', '2024-11-18 07:31:11'),
( 'teyrjhystrf', 'sibghgdyghjryyjyjhu@gmail.com', '$2y$12$mX3hOzFsUrI9RRF2AvyYlOpjcGzt9o6yDKLRlZ52/1lrSoRmk2Tnm', NULL, NULL, NULL, '2024-11-18 07:31:28', '2024-11-18 07:31:28'),
( 'fggfg', 'aaaa@gmail.com', '$2y$12$BEWH5CVUwCx0FVRqgLibaeMRQlVTVJtxsbHEGd5FFPtCe.6lVu.7S', NULL, NULL, NULL, '2024-11-18 07:32:04', '2024-11-18 07:32:04'),   
( 'rrr', 'rrr@gmail.com', '$2y$12$9JgJbUrdS1ZJeYqdU7D4numhirr6yxyGWvOibbR4eIquuLmK5UHEy', NULL, NULL, NULL, '2024-11-18 08:57:18', '2024-11-18 08:57:18'),      
( 'rrr', 'rrrrfgdgffg@gmail.com', '$2y$12$8/x1Rz1F54Jw2GW4Q8sG7uXBCIIMW17mEsNJN0AEaah5bfq4qoyKu', NULL, NULL, NULL, '2024-11-18 08:58:21', '2024-11-18 08:58:21'),
( 'ddvv', 'dcvddc@gmail.com', '$2y$12$6YhnwhEjDoadgwcXR.ePgeFJ6Yt1vHyRPDbbWNnAY/SgvcolEjzx2', NULL, NULL, NULL, '2024-11-18 09:02:07', '2024-11-19 13:11:43'),  
( 'raj', 'raj@gmail.com', '$2y$12$.QEedXL7h1QazJhKb2jfYe3qDsXjONBkTsNjYT68DpRyxJtZsMyYO', NULL, NULL, NULL, '2024-11-18 22:25:16', '2024-11-18 22:25:16'),      
( 'regre', 'aaa@gmail.com', '$2y$12$MgSmPUiswW7WC8Yjyir0YO9mtO7flYauHpo.I3DanVidMXEOSEnAi', NULL, NULL, NULL, '2024-11-19 05:09:58', '2024-11-19 05:09:58'),    
( 'hai', 'test123@gmail.com', '$2y$12$pd.o7h2pdR45e9N9AK94qODPwqp2Cque7Mg4Mhx4QKe9IZnChN5U.', NULL, NULL, NULL, '2024-11-19 09:09:03', '2024-11-19 09:09:03'),  
( 'nanthu', 'nija@gmail.com', '$2y$12$VPA5eyA15TGIrwrK3AaV9O.0lZrTQsorZ./OtPCFnLa23.yFFxbnK', NULL, NULL, NULL, '2024-11-19 23:15:57', '2024-11-19 23:15:57'),  
( 'karthi', 'karthi@gmail.com', '$2y$12$rkAoFOIT7H/ehPoCpFb.XOIZzZ5RheqgEeq77l0IT5EZzsBXn9DzW', NULL, NULL, NULL, '2024-11-20 00:46:25', '2024-11-20 00:46:25'),
( 'moni', 'moni@gmail.com', '$2y$12$NF4./2LtQoiRXkHwD83Po.DJQ9L53AURXDWo7iKyd2PJ8SkrblCVq', NULL, NULL, NULL, '2024-11-20 01:00:57', '2024-11-20 01:00:57'),    
( 'nanthu', 'nanthu@gmail.com', '$2y$12$OawRmHKJs8fO/NkIM16F/.m/Q5SlRExkgZMAlMGPv/t4nNFDzeN6C', NULL, NULL, NULL, '2024-11-20 01:36:52', '2024-11-20 01:36:52'),
( 'kavin', 'kavin@gmail.com', '$2y$12$1zeYdktc26w2kPJmL1EOg.QjoDwUMhGwK5188NBx3nNm2QKnhdcUa', NULL, NULL, NULL, '2024-11-26 04:38:16', '2024-11-26 04:38:16'),  
( 'lingaraj', 'lingaraj@gmail.com', '$2y$12$Y66/wFUMlqtW/5oEwowSwOfkio89m6lA1tEJqqzfcEd1YqBoeqWuC', NULL, NULL, NULL, '2024-11-26 05:25:37', '2024-11-26 05:25:37'),
( 'dfsf', 'bharathi@gmail.com', '$2y$12$fI9V3dz7aUBwKxddX90h/elD1ru7.JNGsIEu7eguOY5TZ8T5Zl1qO', NULL, NULL, NULL, '2024-11-27 01:07:35', '2024-11-27 01:07:35'),
( 'shiva', 'shiva@gmail.com', '$2y$12$9JxtRMDJgl4/R.gsAuYlgeP2p4ABy0AejvKfUsQeRy90QSeYXAta6', NULL, NULL, NULL, '2024-11-28 04:05:53', '2024-11-28 04:05:53');  





COMMIT;