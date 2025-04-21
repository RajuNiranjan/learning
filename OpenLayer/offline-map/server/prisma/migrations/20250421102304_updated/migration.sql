/*
  Warnings:

  - You are about to drop the column `thubmnailBase64Img` on the `TilePrisma_table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TilePrisma_table" DROP COLUMN "thubmnailBase64Img",
ADD COLUMN     "thumbnailBase64Img" TEXT;
