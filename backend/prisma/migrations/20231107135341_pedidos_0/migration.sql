/*
  Warnings:

  - Added the required column `preco` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "preco" DECIMAL(10,2) NOT NULL;
