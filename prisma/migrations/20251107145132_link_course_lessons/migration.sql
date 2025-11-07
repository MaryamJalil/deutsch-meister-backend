/*
  Warnings:

  - Added the required column `updatedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "description" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "hours" INTEGER,
ADD COLUMN     "lessonCount" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "courseId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
