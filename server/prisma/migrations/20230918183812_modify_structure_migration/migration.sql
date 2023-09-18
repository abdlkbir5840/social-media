/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Schooling" ALTER COLUMN "school" SET DEFAULT '',
ALTER COLUMN "diploma" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "location",
ALTER COLUMN "impressions" SET DEFAULT 0,
ALTER COLUMN "occupation" SET DEFAULT '',
ALTER COLUMN "viewedProfile" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '';
