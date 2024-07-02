-- DropForeignKey
ALTER TABLE "task_list" DROP CONSTRAINT "task_list_project_id_fkey";

-- AddForeignKey
ALTER TABLE "task_list" ADD CONSTRAINT "task_list_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
