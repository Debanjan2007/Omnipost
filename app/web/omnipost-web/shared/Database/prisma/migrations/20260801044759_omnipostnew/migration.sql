/*
  Warnings:

  - A unique constraint covering the columns `[userID,provider]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `provider` on the `Accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_userID_fkey";

-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "userID" SET DATA TYPE TEXT,
DROP COLUMN "provider",
ADD COLUMN     "provider" "SocialMedia" NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AppearanceSettings" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_userID_provider_key" ON "Accounts"("userID", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_provider_providerAccountId_key" ON "Accounts"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
