/*
  Warnings:

  - You are about to alter the column `name` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "name" SET DATA TYPE VARCHAR(64);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(64) NOT NULL,
    "description" VARCHAR(128),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_value_key" ON "Role"("value");
