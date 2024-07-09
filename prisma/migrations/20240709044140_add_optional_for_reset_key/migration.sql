-- AlterTable
ALTER TABLE `users` MODIFY `resetKey` VARCHAR(191) NULL,
    MODIFY `resetKeyExpired` DATETIME(3) NULL;
