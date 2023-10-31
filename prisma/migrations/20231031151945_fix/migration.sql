-- DropForeignKey
ALTER TABLE "PageView" DROP CONSTRAINT "PageView_counterId_fkey";

-- AlterTable
ALTER TABLE "PageView" ADD COLUMN     "referer" TEXT;

-- AddForeignKey
ALTER TABLE "PageView" ADD CONSTRAINT "PageView_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "Counter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
