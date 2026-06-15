-- AlterTable
ALTER TABLE "User" ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "phoneNumber" INTEGER,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL;
