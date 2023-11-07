/*
  Warnings:

  - You are about to drop the column `servico_id` on the `Notificacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notificacoes" DROP COLUMN "servico_id",
ADD COLUMN     "pedido_id" INTEGER;
