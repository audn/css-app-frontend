/*
  Warnings:

  - The `versions` column on the `libraries` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_library_fkey";

-- AlterTable
ALTER TABLE "libraries" DROP COLUMN "versions",
ADD COLUMN     "versions" JSONB[];

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_library_fkey" FOREIGN KEY ("library") REFERENCES "libraries"("value") ON DELETE SET NULL ON UPDATE CASCADE;
