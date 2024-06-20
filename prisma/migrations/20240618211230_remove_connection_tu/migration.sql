/*
  Warnings:

  - You are about to drop the `Productivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_productivity_id_fkey";

-- DropTable
DROP TABLE "Productivity";

-- CreateTable
CREATE TABLE "productivity" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(64) NOT NULL,
    "description" VARCHAR(128),
    "sequence_number" SERIAL NOT NULL,

    CONSTRAINT "productivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productivity_value_key" ON "productivity"("value");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_productivity_id_fkey" FOREIGN KEY ("productivity_id") REFERENCES "productivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
