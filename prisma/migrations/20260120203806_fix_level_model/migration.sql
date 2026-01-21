/*
  Warnings:

  - You are about to drop the column `name` on the `Level` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,code]` on the table `Level` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Level_courseId_name_key";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "name",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Level_courseId_code_key" ON "Level"("courseId", "code");
