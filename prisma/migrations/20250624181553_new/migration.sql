/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `booking` table. All the data in the column will be lost.
  - Changed the type of `createdAt` on the `booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startDate` on the `booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lastDate` on the `booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "updatedAt",
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
DROP COLUMN "startDate",
ADD COLUMN     "startDate" INTEGER NOT NULL,
DROP COLUMN "lastDate",
ADD COLUMN     "lastDate" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "booking_roomId_startDate_lastDate_key" ON "booking"("roomId", "startDate", "lastDate");
