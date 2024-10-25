DROP DATABASE IF EXISTS support;
CREATE DATABASE support CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE support;

DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets
(
    ticketNumber BIGINT,
    lastName VARCHAR(255),
    firstName VARCHAR(255),
    topic VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    additionalInfo TEXT,
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dateUpdated TIMESTAMP,
    ticketStatus INT DEFAULT 1,
    filePath VARCHAR(255),
    PRIMARY KEY(ticketNumber)
);
