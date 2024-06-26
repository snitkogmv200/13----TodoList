/*
  Warnings:

  - You are about to drop the column `category_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `productivity_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productivity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taskId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_category_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_productivity_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_projectId_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "category_id",
DROP COLUMN "productivity_id";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "projectId",
ADD COLUMN     "taskId" TEXT NOT NULL;

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "productivity";

-- CreateTable
CREATE TABLE "task_list" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(64) NOT NULL,
    "description" VARCHAR(128),
    "sequence_number" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "task_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_list_value_key" ON "task_list"("value");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_list" ADD CONSTRAINT "task_list_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
