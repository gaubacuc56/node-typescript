/*
  Warnings:

  - A unique constraint covering the columns `[resetKeyExpired]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `resetKey` VARCHAR(191) NULL,
    ADD COLUMN `resetKeyExpired` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_resetKeyExpired_key` ON `users`(`resetKeyExpired`);
