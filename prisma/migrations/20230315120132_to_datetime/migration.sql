/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Habit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updatedAt` on the `Habit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Habit` MODIFY `createdAt` DATETIME(3) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL;
