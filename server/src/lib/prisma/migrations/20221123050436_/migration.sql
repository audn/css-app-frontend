/*
  Warnings:

  - You are about to drop the column `categoryValue` on the `posts` table. All the data in the column will be lost.
  - Added the required column `category` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `author` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_categoryValue_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "categoryValue",
ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "author" SET NOT NULL;

-- DropEnum
DROP TYPE "Categories";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
