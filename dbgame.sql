/*
SQLyog Community v11.52 (64 bit)
MySQL - 5.7.20-log : Database - balloonpop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`balloonpop` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `balloonpop`;

/*Table structure for table `player_score` */

DROP TABLE IF EXISTS `player_score`;

CREATE TABLE `player_score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_name` varchar(25) DEFAULT NULL,
  `score` int(100) DEFAULT NULL,
  `profile_link` varchar(255) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `random_number` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `player_score` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
