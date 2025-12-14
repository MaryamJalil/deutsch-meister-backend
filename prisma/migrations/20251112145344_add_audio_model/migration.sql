/*
  Warnings:

  - You are about to drop the column `s3Key` on the `Audio` table. All the data in the column will be lost.
  - You are about to drop the column `audioId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_audioId_fkey";

-- DropIndex
DROP INDEX "Audio_s3Key_key";

-- AlterTable
ALTER TABLE "Audio" DROP COLUMN "s3Key",
ADD COLUMN     "lessonId" INTEGER;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "audioId";

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
