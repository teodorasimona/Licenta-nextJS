-- CreateTable
CREATE TABLE `trails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('hiking', 'biking', 'walking') NOT NULL,
    `difficulty` ENUM('easy', 'medium', 'hard') NOT NULL,
    `distance_km` FLOAT NOT NULL,
    `coordinates` VARCHAR(191) NULL,
    `route` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
