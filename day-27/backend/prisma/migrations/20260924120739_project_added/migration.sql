/*
  Warnings:

  - Added the required column `project` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "project" TEXT NOT NULL;
