/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('contact', 'prospect', 'customer');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "type",
ADD COLUMN     "type" "CustomerType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user';
