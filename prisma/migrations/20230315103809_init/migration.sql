-- CreateTable
CREATE TABLE `Habit` (
    `habitId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `updatedAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`habitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HabitStatus` (
    `habit_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `habitId` INTEGER NOT NULL,
    `isCompleted` BOOLEAN NOT NULL,
    `targetedDate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`habit_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HabitStatus` ADD CONSTRAINT `HabitStatus_habitId_fkey` FOREIGN KEY (`habitId`) REFERENCES `Habit`(`habitId`) ON DELETE RESTRICT ON UPDATE CASCADE;
