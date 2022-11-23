-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "library" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "preferences" JSONB;
