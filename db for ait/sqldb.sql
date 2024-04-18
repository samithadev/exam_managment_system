CREATE DATABASE  IF NOT EXISTS `ems_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ems_db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ems_db
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `answerId` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `answer` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`answerId`),
  KEY `fk_questionId_idx` (`questionId`),
  CONSTRAINT `fk_questionId` FOREIGN KEY (`questionId`) REFERENCES `questions` (`question_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (85,24,'30',0),(86,24,'20',1),(87,24,'10',0),(88,24,'50',0),(89,25,'50',0),(90,25,'20',0),(91,25,'40',1),(92,25,'10',0),(93,26,'70',1),(94,26,'75',0),(95,26,'55',0),(96,26,'45',0),(117,32,'30',0),(118,32,'40',1),(119,32,'10',0),(120,32,'50',0),(121,33,'10',0),(122,33,'40',0),(123,33,'30',0),(124,33,'60',1),(125,34,'50',1),(126,34,'2',0),(127,34,'60',0),(128,34,'30',0),(129,35,'10',0),(130,35,'20',1),(131,35,'40',0),(132,35,'50',0),(133,36,'40',1),(134,36,'50',0),(135,36,'10',0),(136,36,'20',0),(137,37,'d',1),(138,37,'dw',0),(139,37,'dw',0),(140,37,'vr',0),(141,38,'EGFS',0),(142,38,'esv',0),(143,38,'v',1),(144,38,'wfef',0),(193,51,'250',1),(194,51,'700',0),(195,51,'300',0),(196,51,'600',0),(197,52,'200',0),(198,52,'450',0),(199,52,'250',0),(200,52,'300',1),(201,53,'350',0),(202,53,'150',1),(203,53,'100',0),(204,53,'250',0);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `exam_id` int NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `status` enum('draft','published') NOT NULL,
  `createdUser` int NOT NULL,
  `examDate` datetime DEFAULT NULL,
  PRIMARY KEY (`exam_id`),
  KEY `fk_user_idx` (`createdUser`),
  CONSTRAINT `fk_user` FOREIGN KEY (`createdUser`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (18,'Exam 001',120,'published',1,'2024-04-19 11:30:00'),(21,'Exam 002',120,'published',1,'2024-04-18 12:30:00'),(22,'Exam 003',180,'draft',1,'2024-04-18 16:00:00'),(23,'Exam 004',180,'draft',1,'2024-04-18 03:00:00'),(24,'exam 006',160,'published',1,'2024-04-18 14:00:00'),(25,'Exam 007',90,'published',1,'2024-04-18 18:00:00');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_enrollment`
--

DROP TABLE IF EXISTS `exam_enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_enrollment` (
  `enrollId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `examId` int NOT NULL,
  `grade` varchar(1) DEFAULT NULL,
  `points` int DEFAULT NULL,
  `passfailStatus` enum('pass','fail') DEFAULT NULL,
  `enrollStatus` enum('pending','attended') DEFAULT NULL,
  PRIMARY KEY (`enrollId`),
  KEY `fk_userID_idx` (`userId`),
  KEY `fk_examID_idx` (`examId`),
  CONSTRAINT `fk_enroll_examID` FOREIGN KEY (`examId`) REFERENCES `exam` (`exam_id`),
  CONSTRAINT `fk_enroll_userID` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_enrollment`
--

LOCK TABLES `exam_enrollment` WRITE;
/*!40000 ALTER TABLE `exam_enrollment` DISABLE KEYS */;
INSERT INTO `exam_enrollment` VALUES (12,2,21,'F',0,'fail','attended'),(13,6,21,'F',0,'fail','attended'),(14,2,24,'F',0,'fail','attended'),(15,2,25,'A',100,'pass','attended');
/*!40000 ALTER TABLE `exam_enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_Id` int NOT NULL AUTO_INCREMENT,
  `examId` int NOT NULL,
  `question` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`question_Id`),
  KEY `fk_examId_idx` (`examId`),
  CONSTRAINT `fk_examId` FOREIGN KEY (`examId`) REFERENCES `exam` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (24,18,'10 + 10?'),(25,18,'20 + 20?'),(26,18,'35 + 35?'),(32,21,'20 + 20?'),(33,21,'30 + 30?'),(34,22,'100/2 ?'),(35,23,'10 + 10?'),(36,23,'20 + 20?'),(37,24,'bwhb'),(38,24,'QDAW'),(51,25,'500 - 250?'),(52,25,'150 + 150?'),(53,25,'300 - 150?');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'teacher'),(2,'student');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentanswers`
--

DROP TABLE IF EXISTS `studentanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentanswers` (
  `studentAns_Id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `examId` int NOT NULL,
  `questionId` int NOT NULL,
  `answerId` int DEFAULT NULL,
  `ansStatus` enum('correct','wrong') DEFAULT NULL,
  PRIMARY KEY (`studentAns_Id`),
  KEY `fk_ansId_idx` (`answerId`),
  KEY `fk_examsId_idx` (`examId`),
  KEY `fk_userId_idx` (`userId`),
  KEY `fk_questionsId_idx` (`questionId`),
  CONSTRAINT `fk_ansId` FOREIGN KEY (`answerId`) REFERENCES `answers` (`answerId`),
  CONSTRAINT `fk_examsId` FOREIGN KEY (`examId`) REFERENCES `exam_enrollment` (`examId`),
  CONSTRAINT `fk_questionsId` FOREIGN KEY (`questionId`) REFERENCES `questions` (`question_Id`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `exam_enrollment` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentanswers`
--

LOCK TABLES `studentanswers` WRITE;
/*!40000 ALTER TABLE `studentanswers` DISABLE KEYS */;
INSERT INTO `studentanswers` VALUES (44,2,21,32,118,'correct'),(45,2,21,33,121,'wrong'),(46,6,21,32,118,'correct'),(47,6,21,33,121,'wrong'),(48,2,24,37,137,'correct'),(49,2,24,38,143,'correct'),(50,2,25,51,193,'correct'),(51,2,25,52,200,'correct'),(52,2,25,53,202,'correct');
/*!40000 ALTER TABLE `studentanswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_role_id_idx` (`role`),
  CONSTRAINT `fk_role_id` FOREIGN KEY (`role`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@gmail.com','123',1),(2,'test2@gmail.com','123',2),(3,'teacher2@gmail.com','123',1),(4,'student.test@gmail.com','123',2),(6,'student@gmail.com','123',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19  0:40:12
