/*
  Warnings:

  - You are about to drop the column `likedAt` on the `upvotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "upvotes" DROP COLUMN "likedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "downvotes" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "downvotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
