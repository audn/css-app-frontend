/*
  Warnings:

  - You are about to drop the column `categoryRelation` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `libraryRelation` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userRelation` on the `posts` table. All the data in the column will be lost.
  - Added the required column `author` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_categoryRelation_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_libraryRelation_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userRelation_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "categoryRelation",
DROP COLUMN "libraryRelation",
DROP COLUMN "userRelation",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "library" TEXT DEFAULT 'Unknown';

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_library_fkey" FOREIGN KEY ("library") REFERENCES "libraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;
