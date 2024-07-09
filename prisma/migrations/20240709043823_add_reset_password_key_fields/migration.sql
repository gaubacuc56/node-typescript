/*
  Warnings:

  - A unique constraint covering the columns `[resetKeyExpired]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resetKey` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetKeyExpired` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `resetKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `resetKeyExpired` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_resetKeyExpired_key` ON `users`(`resetKeyExpired`);
