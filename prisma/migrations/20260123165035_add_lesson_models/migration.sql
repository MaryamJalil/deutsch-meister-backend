/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `LessonContent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[levelId,order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "LessonContent" DROP CONSTRAINT "LessonContent_lessonId_fkey";

-- DropIndex
DROP INDEX "Lesson_moduleId_idx";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "deletedAt",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "moduleId" DROP NOT NULL;

-- DropTable
DROP TABLE "LessonContent";

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "sentence" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vocabulary_lessonId_idx" ON "Vocabulary"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_lessonId_word_key" ON "Vocabulary"("lessonId", "word");

-- CreateIndex
CREATE INDEX "Example_lessonId_idx" ON "Example"("lessonId");

-- CreateIndex
CREATE INDEX "Lesson_levelId_idx" ON "Lesson"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_levelId_order_key" ON "Lesson"("levelId", "order");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
