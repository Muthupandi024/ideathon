-- ============================================================
-- IDEATHON '26 - Database Creation & Relational Schema
-- Target Database: MySQL 8.0+
-- AAA College of Engineering and Technology - Department of IT
-- ============================================================

CREATE DATABASE IF NOT EXISTS `ideathon26_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `ideathon26_db`;

-- ------------------------------------------------------------
-- 1. Table: admins
-- Purpose: Store administrative credentials for JWT verification
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 2. Table: registrations
-- Purpose: Store team registration, idea submission & payment tracking
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration_id` VARCHAR(20) NOT NULL UNIQUE,
  `team_name` VARCHAR(100) NOT NULL,
  `team_size` INT NOT NULL CHECK (`team_size` IN (2, 4)),
  `college_name` VARCHAR(150) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `year` VARCHAR(20) NOT NULL,
  `problem_statement` TEXT NOT NULL,
  `proposed_solution` TEXT NOT NULL,
  `technology_stack` VARCHAR(255) NOT NULL,
  `github_url` VARCHAR(255) NULL,
  `linkedin_url` VARCHAR(255) NULL,
  `payment_reference` VARCHAR(100) NOT NULL,
  `payment_status` ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 3. Table: team_members
-- Purpose: Store individual team member details linked to registration
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration_id` VARCHAR(20) NOT NULL,
  `role` ENUM('LEADER', 'MEMBER_2', 'MEMBER_3', 'MEMBER_4') NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_members_registration` 
    FOREIGN KEY (`registration_id`) 
    REFERENCES `registrations` (`registration_id`) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 4. Table: contact_messages
-- Purpose: Store user inquiries submitted from Contact section
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

