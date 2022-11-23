/*
  Warnings:

  - A unique constraint covering the columns `[twitterId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitterId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "discordId" TEXT NOT NULL,
ADD COLUMN     "twitterId" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "users_twitterId_key" ON "users"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "users_discordId_key" ON "users"("discordId");
