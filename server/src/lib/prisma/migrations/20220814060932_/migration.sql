/*
  Warnings:

  - You are about to drop the column `votes` on the `ideas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ideas" DROP COLUMN "votes",
ADD COLUMN     "voteCount" INTEGER NOT NULL DEFAULT 0;
