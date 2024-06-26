/*
  Warnings:

  - You are about to drop the column `taskId` on the `task` table. All the data in the column will be lost.
  - Added the required column `task_list_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_taskId_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "taskId",
ADD COLUMN     "task_list_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_list_id_fkey" FOREIGN KEY ("task_list_id") REFERENCES "task_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
