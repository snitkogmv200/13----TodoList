/*
  Warnings:

  - You are about to drop the column `progress` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productivity_id` to the `project` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_completed` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserRoles" DROP CONSTRAINT "UserRoles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoles" DROP CONSTRAINT "UserRoles_userId_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "productivity_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "progress",
ADD COLUMN     "sequence_number" SERIAL NOT NULL,
ALTER COLUMN "is_completed" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "UserRoles";

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(64) NOT NULL,
    "description" VARCHAR(128),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Productivity" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(64) NOT NULL,
    "description" VARCHAR(128),
    "sequence_number" SERIAL NOT NULL,

    CONSTRAINT "Productivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_value_key" ON "role"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Productivity_value_key" ON "Productivity"("value");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_productivity_id_fkey" FOREIGN KEY ("productivity_id") REFERENCES "Productivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
