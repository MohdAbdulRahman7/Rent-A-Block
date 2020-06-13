-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2020 at 01:14 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renter`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `RenterAddOrEdit` (IN `_id` INT, IN `_vehicle_rc` VARCHAR(100), IN `_user_licence` VARCHAR(100), IN `_rc_img` TEXT, IN `_lic_img` TEXT)  BEGIN
	IF _id =0 THEN
		INSERT INTO rent(vehicle_rc,user_licence,rc_img,lic_img)
        VALUES (_vehicle_rc,_user_licence,_rc_img,_lic_img);
        
        SET _id = LAST_INSERT_ID();
	ELSE
		UPDATE rent
        SET
        vehicle_rc = _vehicle_rc,
        user_licence = _user_licence,
        rc_img = _rc_img,
        lic_img = _lic_img
        where id = _id;
	END IF;
    
    SELECT _id AS 'id';
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `id` int(11) NOT NULL,
  `vehicle_rc` varchar(100) NOT NULL,
  `user_licence` varchar(100) NOT NULL,
  `rc_img` text NOT NULL,
  `lic_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`id`, `vehicle_rc`, `user_licence`, `rc_img`, `lic_img`) VALUES
(1, 'rahman12355', 'rahman56489656324', 'bg.jpg', 'bg.jpg'),
(3, 'fahad', 'gddfg', '', ''),
(5, 'r', 'rahman56489656324', 'bg.jpg', 'bg.jpg'),
(6, 'gfgd', 'gddfg', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rent`
--
ALTER TABLE `rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
