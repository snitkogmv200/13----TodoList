/*
  Warnings:

  - You are about to drop the column `user_id` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_user_id_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "user_id";
