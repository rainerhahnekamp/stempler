/*
  Warnings:

  - Added the required column `userId` to the `Measurement` table without a default value. This is not possible if the table is not empty.

*/

DELETE
FROM Measurement;
DELETE
FROM Tag;

-- AlterTable
ALTER TABLE `Measurement`
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User`
(
    `id`      VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP (3),
    `email`   VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagToUser`
(
    `A`   INTEGER      NOT NULL,
    `B`   VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TagToUser_AB_unique`(`A`, `B`),
    INDEX `_TagToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
