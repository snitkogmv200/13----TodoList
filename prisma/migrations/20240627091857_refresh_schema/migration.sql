/*
  Warnings:

  - You are about to drop the column `sequence_number` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `sequence_number` on the `task_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "sequence_number",
ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "task_list" DROP COLUMN "sequence_number",
ADD COLUMN     "order" SERIAL NOT NULL;
