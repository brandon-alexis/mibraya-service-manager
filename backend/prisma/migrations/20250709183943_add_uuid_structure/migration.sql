/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_RecordToService` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_clientId_fkey";

-- DropForeignKey
ALTER TABLE "_RecordToService" DROP CONSTRAINT "_RecordToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecordToService" DROP CONSTRAINT "_RecordToService_B_fkey";

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Client_id_seq";

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "clientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Record_id_seq";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Service_id_seq";

-- AlterTable
ALTER TABLE "_RecordToService" DROP CONSTRAINT "_RecordToService_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_RecordToService_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordToService" ADD CONSTRAINT "_RecordToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordToService" ADD CONSTRAINT "_RecordToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
