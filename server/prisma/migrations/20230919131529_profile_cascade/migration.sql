-- DropForeignKey
ALTER TABLE "Schooling" DROP CONSTRAINT "Schooling_userProfileId_fkey";

-- AddForeignKey
ALTER TABLE "Schooling" ADD CONSTRAINT "Schooling_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
