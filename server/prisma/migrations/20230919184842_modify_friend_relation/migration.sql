/*
  Warnings:

  - You are about to drop the column `followingId` on the `Friend` table. All the data in the column will be lost.
  - Added the required column `followedId` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_followingId_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "followingId",
ADD COLUMN     "followedId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
