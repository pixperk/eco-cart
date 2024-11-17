-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_mainUserId_fkey";

-- DropForeignKey
ALTER TABLE "CartUser" DROP CONSTRAINT "CartUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_mainUserId_fkey" FOREIGN KEY ("mainUserId") REFERENCES "User"("kindeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartUser" ADD CONSTRAINT "CartUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("kindeId") ON DELETE RESTRICT ON UPDATE CASCADE;
