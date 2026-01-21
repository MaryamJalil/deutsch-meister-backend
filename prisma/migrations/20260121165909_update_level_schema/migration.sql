/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Level` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,code,deleted_at]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "LevelName" ADD VALUE 'C2';

-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_courseId_fkey";

-- DropIndex
DROP INDEX "Level_courseId_code_key";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "deletedAt",
DROP COLUMN "order",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Level_courseId_position_idx" ON "Level"("courseId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Level_courseId_code_deleted_at_key" ON "Level"("courseId", "code", "deleted_at");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
