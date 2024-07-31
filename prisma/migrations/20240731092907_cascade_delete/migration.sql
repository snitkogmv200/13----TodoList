-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_user_id_fkey";

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
