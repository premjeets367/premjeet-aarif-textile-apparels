-- =============================================================
-- Textile & Apparels — Database Schema
-- Import this file in phpMyAdmin (XAMPP) or via:
--   mysql -u root -p < textile.sql
-- =============================================================

CREATE DATABASE IF NOT EXISTS textile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE textile;

-- -------------------------------------------------------------
-- Table: contact  (messages submitted from contact.html)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    phone      VARCHAR(20)  NOT NULL,
    subject    VARCHAR(150) NOT NULL,
    message    TEXT         NOT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
