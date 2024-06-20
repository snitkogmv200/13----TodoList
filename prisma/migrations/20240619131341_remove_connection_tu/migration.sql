/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "nickname" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");
