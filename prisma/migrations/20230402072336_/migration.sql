/*
  Warnings:

  - The primary key for the `HabitStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `habit_status_id` on the `HabitStatus` table. All the data in the column will be lost.
  - Added the required column `habitStatusId` to the `HabitStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HabitStatus` DROP PRIMARY KEY,
    DROP COLUMN `habit_status_id`,
    ADD COLUMN `habitStatusId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`habitStatusId`);
