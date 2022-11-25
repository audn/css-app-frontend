/*
  Warnings:

  - You are about to drop the column `author` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `library` on the `posts` table. All the data in the column will be lost.
  - Added the required column `userRelation` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_library_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "author",
DROP COLUMN "category",
DROP COLUMN "library",
ADD COLUMN     "categoryRelation" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "libraryRelation" TEXT DEFAULT 'Unknown',
ADD COLUMN     "userRelation" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userRelation_fkey" FOREIGN KEY ("userRelation") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryRelation_fkey" FOREIGN KEY ("categoryRelation") REFERENCES "categories"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_libraryRelation_fkey" FOREIGN KEY ("libraryRelation") REFERENCES "libraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;
