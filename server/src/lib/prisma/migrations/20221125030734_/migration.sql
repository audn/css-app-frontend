/*
  Warnings:

  - The `preferences` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "responsive" BOOLEAN,
ALTER COLUMN "category" SET DEFAULT 'Unknown',
ALTER COLUMN "library" DROP NOT NULL,
ALTER COLUMN "library" SET DEFAULT 'Unknown';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "preferences",
ADD COLUMN     "preferences" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- CreateTable
CREATE TABLE "libraries" (
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "libraries_pkey" PRIMARY KEY ("value")
);

-- CreateIndex
CREATE UNIQUE INDEX "libraries_value_key" ON "libraries"("value");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_library_fkey" FOREIGN KEY ("library") REFERENCES "libraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;
