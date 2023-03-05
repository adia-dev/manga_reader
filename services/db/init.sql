CREATE TABLE `manga-reader`.`users` (`id` INT NOT NULL AUTO_INCREMENT , `firebase_id` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
ALTER TABLE `users` ADD `username` VARCHAR(255) NULL AFTER `email`;
ALTER TABLE `users` ADD `gender` VARCHAR(50) NOT NULL DEFAULT 'Male' AFTER `username`;