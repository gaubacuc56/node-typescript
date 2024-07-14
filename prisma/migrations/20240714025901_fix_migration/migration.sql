/*
  Warnings:

  - You are about to drop the column `resetKey` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetKeyExpired` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_resetKeyExpired_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `resetKey`,
    DROP COLUMN `resetKeyExpired`;
