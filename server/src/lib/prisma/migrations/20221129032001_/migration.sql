-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_library_fkey";

-- AlterTable
ALTER TABLE "libraries" ADD COLUMN     "docs" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_library_fkey" FOREIGN KEY ("library") REFERENCES "libraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;
