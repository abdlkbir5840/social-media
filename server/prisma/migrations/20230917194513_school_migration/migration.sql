-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "relationshipStatus" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Schooling" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "diploma" TEXT NOT NULL,
    "userProfileId" INTEGER NOT NULL,

    CONSTRAINT "Schooling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schooling" ADD CONSTRAINT "Schooling_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
