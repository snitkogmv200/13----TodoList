/*
  Warnings:

  - Made the column `task_list_id` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "task_list_id" SET NOT NULL;
