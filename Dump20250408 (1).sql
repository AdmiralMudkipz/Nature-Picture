-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: nature_picture_backup
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `art_piece`
--

DROP TABLE IF EXISTS `art_piece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art_piece` (
  `art_id` int NOT NULL AUTO_INCREMENT,
  `type_of_art` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `stock_amount` int NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`art_id`),
  KEY `art_piece_ibfk_1` (`user_id`),
  CONSTRAINT `art_piece_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art_piece`
--

LOCK TABLES `art_piece` WRITE;
/*!40000 ALTER TABLE `art_piece` DISABLE KEYS */;
INSERT INTO `art_piece` VALUES (2,'painting','sunset','sunset painting of the beach',NULL,2,100.00,1),(3,'sculpture','dog','sculpture of a dog',NULL,4,50.00,2);
/*!40000 ALTER TABLE `art_piece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add item',7,'add_item'),(26,'Can change item',7,'change_item'),(27,'Can delete item',7,'delete_item'),(28,'Can view item',7,'view_item'),(29,'Can add art piece',8,'add_artpiece'),(30,'Can change art piece',8,'change_artpiece'),(31,'Can delete art piece',8,'delete_artpiece'),(32,'Can view art piece',8,'view_artpiece'),(33,'Can add auth group',9,'add_authgroup'),(34,'Can change auth group',9,'change_authgroup'),(35,'Can delete auth group',9,'delete_authgroup'),(36,'Can view auth group',9,'view_authgroup'),(37,'Can add auth group permissions',10,'add_authgrouppermissions'),(38,'Can change auth group permissions',10,'change_authgrouppermissions'),(39,'Can delete auth group permissions',10,'delete_authgrouppermissions'),(40,'Can view auth group permissions',10,'view_authgrouppermissions'),(41,'Can add auth permission',11,'add_authpermission'),(42,'Can change auth permission',11,'change_authpermission'),(43,'Can delete auth permission',11,'delete_authpermission'),(44,'Can view auth permission',11,'view_authpermission'),(45,'Can add auth user',12,'add_authuser'),(46,'Can change auth user',12,'change_authuser'),(47,'Can delete auth user',12,'delete_authuser'),(48,'Can view auth user',12,'view_authuser'),(49,'Can add auth user groups',13,'add_authusergroups'),(50,'Can change auth user groups',13,'change_authusergroups'),(51,'Can delete auth user groups',13,'delete_authusergroups'),(52,'Can view auth user groups',13,'view_authusergroups'),(53,'Can add auth user user permissions',14,'add_authuseruserpermissions'),(54,'Can change auth user user permissions',14,'change_authuseruserpermissions'),(55,'Can delete auth user user permissions',14,'delete_authuseruserpermissions'),(56,'Can view auth user user permissions',14,'view_authuseruserpermissions'),(57,'Can add base item',15,'add_baseitem'),(58,'Can change base item',15,'change_baseitem'),(59,'Can delete base item',15,'delete_baseitem'),(60,'Can view base item',15,'view_baseitem'),(61,'Can add cart',16,'add_cart'),(62,'Can change cart',16,'change_cart'),(63,'Can delete cart',16,'delete_cart'),(64,'Can view cart',16,'view_cart'),(65,'Can add cart art piece',17,'add_cartartpiece'),(66,'Can change cart art piece',17,'change_cartartpiece'),(67,'Can delete cart art piece',17,'delete_cartartpiece'),(68,'Can view cart art piece',17,'view_cartartpiece'),(69,'Can add django admin log',18,'add_djangoadminlog'),(70,'Can change django admin log',18,'change_djangoadminlog'),(71,'Can delete django admin log',18,'delete_djangoadminlog'),(72,'Can view django admin log',18,'view_djangoadminlog'),(73,'Can add django content type',19,'add_djangocontenttype'),(74,'Can change django content type',19,'change_djangocontenttype'),(75,'Can delete django content type',19,'delete_djangocontenttype'),(76,'Can view django content type',19,'view_djangocontenttype'),(77,'Can add django migrations',20,'add_djangomigrations'),(78,'Can change django migrations',20,'change_djangomigrations'),(79,'Can delete django migrations',20,'delete_djangomigrations'),(80,'Can view django migrations',20,'view_djangomigrations'),(81,'Can add django session',21,'add_djangosession'),(82,'Can change django session',21,'change_djangosession'),(83,'Can delete django session',21,'delete_djangosession'),(84,'Can view django session',21,'view_djangosession'),(85,'Can add location',22,'add_location'),(86,'Can change location',22,'change_location'),(87,'Can delete location',22,'delete_location'),(88,'Can view location',22,'view_location'),(89,'Can add purchase order',23,'add_purchaseorder'),(90,'Can change purchase order',23,'change_purchaseorder'),(91,'Can delete purchase order',23,'delete_purchaseorder'),(92,'Can view purchase order',23,'view_purchaseorder'),(93,'Can add purchase order art piece',24,'add_purchaseorderartpiece'),(94,'Can change purchase order art piece',24,'change_purchaseorderartpiece'),(95,'Can delete purchase order art piece',24,'delete_purchaseorderartpiece'),(96,'Can view purchase order art piece',24,'view_purchaseorderartpiece'),(97,'Can add reviews',25,'add_reviews'),(98,'Can change reviews',25,'change_reviews'),(99,'Can delete reviews',25,'delete_reviews'),(100,'Can view reviews',25,'view_reviews'),(101,'Can add users',26,'add_users'),(102,'Can change users',26,'change_users'),(103,'Can delete users',26,'delete_users'),(104,'Can view users',26,'view_users'),(105,'Can add user',27,'add_customuser'),(106,'Can change user',27,'change_customuser'),(107,'Can delete user',27,'delete_customuser'),(108,'Can view user',27,'view_customuser');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$eAK56Jolfa4MRFLLdtf9vD$+2AkEnLMyozY46B9+myRT+lyUGWfOE+fZpaIupqiTjY=','2025-04-08 12:45:53.890765',1,'hsoll','','','hsollas@gmail.com',1,1,'2025-04-08 12:45:36.521061');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_item`
--

DROP TABLE IF EXISTS `base_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_item`
--

LOCK TABLES `base_item` WRITE;
/*!40000 ALTER TABLE `base_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_art_piece`
--

DROP TABLE IF EXISTS `cart_art_piece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_art_piece` (
  `cart_art_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `art_id` int NOT NULL,
  PRIMARY KEY (`cart_art_id`),
  KEY `cart_fk_idx` (`cart_id`),
  KEY `art_piece_fk` (`art_id`),
  CONSTRAINT `art_piece_fk` FOREIGN KEY (`art_id`) REFERENCES `art_piece` (`art_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cart_fk` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_art_piece`
--

LOCK TABLES `cart_art_piece` WRITE;
/*!40000 ALTER TABLE `cart_art_piece` DISABLE KEYS */;
INSERT INTO `cart_art_piece` VALUES (9,2,3),(10,1,2),(11,1,3);
/*!40000 ALTER TABLE `cart_art_piece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(8,'base','artpiece'),(9,'base','authgroup'),(10,'base','authgrouppermissions'),(11,'base','authpermission'),(12,'base','authuser'),(13,'base','authusergroups'),(14,'base','authuseruserpermissions'),(15,'base','baseitem'),(16,'base','cart'),(17,'base','cartartpiece'),(27,'base','customuser'),(18,'base','djangoadminlog'),(19,'base','djangocontenttype'),(20,'base','djangomigrations'),(21,'base','djangosession'),(7,'base','item'),(22,'base','location'),(23,'base','purchaseorder'),(24,'base','purchaseorderartpiece'),(25,'base','reviews'),(26,'base','users'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-04-08 02:35:28.633400'),(2,'auth','0001_initial','2025-04-08 02:35:28.714527'),(3,'admin','0001_initial','2025-04-08 02:35:28.735437'),(4,'admin','0002_logentry_remove_auto_add','2025-04-08 02:35:28.738196'),(5,'admin','0003_logentry_add_action_flag_choices','2025-04-08 02:35:28.740335'),(6,'contenttypes','0002_remove_content_type_name','2025-04-08 02:35:28.756719'),(7,'auth','0002_alter_permission_name_max_length','2025-04-08 02:35:28.767569'),(8,'auth','0003_alter_user_email_max_length','2025-04-08 02:35:28.773282'),(9,'auth','0004_alter_user_username_opts','2025-04-08 02:35:28.775615'),(10,'auth','0005_alter_user_last_login_null','2025-04-08 02:35:28.783833'),(11,'auth','0006_require_contenttypes_0002','2025-04-08 02:35:28.784350'),(12,'auth','0007_alter_validators_add_error_messages','2025-04-08 02:35:28.786537'),(13,'auth','0008_alter_user_username_max_length','2025-04-08 02:35:28.797496'),(14,'auth','0009_alter_user_last_name_max_length','2025-04-08 02:35:28.806766'),(15,'auth','0010_alter_group_name_max_length','2025-04-08 02:35:28.811515'),(16,'auth','0011_update_proxy_permissions','2025-04-08 02:35:28.814752'),(17,'auth','0012_alter_user_first_name_max_length','2025-04-08 02:35:28.824584'),(18,'base','0001_initial','2025-04-08 02:35:28.826953'),(19,'sessions','0001_initial','2025-04-08 02:35:28.830919'),(20,'base','0002_initial','2025-04-08 04:08:57.763847');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0j7tur7agy4njpc2ar4rbw144l70ovqe','.eJxVjMsOwiAURP-FtSFAeYhL934DuQ8qVUOT0q6M_y5NutDdZM6ZeYsE21rS1vKSJhYXocXpt0OgZ6474AfU-yxprusyodwVedAmbzPn1_Vw_w4KtNLX4AwCYwCjwUY0IyobHIXIo1PB0Bk9q-ghUzesRvQKBqvJDT1gDuLzBfiqODk:1u28Kv:iV8dVQB-Ni1ERgM7Cwi1XVebaVHHp6jLFFp1Gs_fXSA','2025-04-22 12:45:53.893689');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `county` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'ocean','nj'),(2,'monmouth','nj'),(3,'gloucester','nj');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `purchase_order_id` int NOT NULL AUTO_INCREMENT,
  `date_purchased` date NOT NULL,
  `buyer_id` int NOT NULL,
  `seller_id` int NOT NULL,
  PRIMARY KEY (`purchase_order_id`),
  KEY `buyer_purchase_order` (`buyer_id`),
  KEY `seller_purchase_order_idx` (`seller_id`),
  CONSTRAINT `purchae_order_seller_fk` FOREIGN KEY (`seller_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `purchase_order_buyer_fk` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
INSERT INTO `purchase_order` VALUES (2,'2024-01-05',2,1),(3,'2024-01-04',1,2);
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_art_piece`
--

DROP TABLE IF EXISTS `purchase_order_art_piece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_art_piece` (
  `purchase_order_art_id` int NOT NULL AUTO_INCREMENT,
  `purchase_order_id` int NOT NULL,
  `art_id` int NOT NULL,
  PRIMARY KEY (`purchase_order_art_id`),
  KEY `purchase_order_art_fk_idx` (`art_id`),
  KEY `purchase_order_fk_idx` (`purchase_order_id`),
  CONSTRAINT `purchase_order_art_fk` FOREIGN KEY (`art_id`) REFERENCES `art_piece` (`art_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `purchase_order_fk` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_order` (`purchase_order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_art_piece`
--

LOCK TABLES `purchase_order_art_piece` WRITE;
/*!40000 ALTER TABLE `purchase_order_art_piece` DISABLE KEYS */;
INSERT INTO `purchase_order_art_piece` VALUES (3,2,2),(4,2,3);
/*!40000 ALTER TABLE `purchase_order_art_piece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `reviewer_id` int NOT NULL,
  `reviewed_id` int NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `review_user_fk_idx` (`reviewer_id`),
  KEY `review_seller_fk_idx` (`reviewed_id`),
  CONSTRAINT `reviews_reviewed_fk` FOREIGN KEY (`reviewed_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reviews_reviewer_fk` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,3,1,2),(2,2,1,2),(3,5,2,3);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `location_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `location_user_fk_idx` (`location_id`),
  CONSTRAINT `location_user_fk` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hsollas','password','hailey','sollas',1,'sollas45@students.rowan.edu'),(2,'asollas','password','alaina','sollas',2,'asollas@gmail.com'),(3,'ksollas','passwd','kylie','sollas',1,'ksollas@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08 12:50:48
