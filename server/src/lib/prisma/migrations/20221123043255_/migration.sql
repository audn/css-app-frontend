/*
  Warnings:

  - You are about to drop the column `userId` on the `posts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('buttons', 'grid', 'alerts');

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "userId",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "categoryValue" TEXT;

-- CreateTable
CREATE TABLE "categories" (
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("value")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_value_key" ON "categories"("value");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryValue_fkey" FOREIGN KEY ("categoryValue") REFERENCES "categories"("value") ON DELETE SET NULL ON UPDATE CASCADE;
