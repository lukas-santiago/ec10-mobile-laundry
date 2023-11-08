import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
export async function createServico(nome, descricao, preco) {
	return await prisma.servicos.create({
		data: { nome, descricao, preco },
	})
}

// Read
export async function getServicoById(id) {
	return await prisma.servicos.findUnique({
		where: { id },
	})
}

// Update
export async function updateServico(id, nome, descricao, preco) {
	return await prisma.servicos.update({
		where: { id },
		data: { nome, descricao, preco },
	})
}

// Delete
export async function deleteServico(id) {
	return await prisma.servicos.delete({
		where: { id },
	})
}

// Disable
export async function disableServico(id) {
	return await prisma.servicos.update({
		where: { id },
		data: { ativo: false },
	})
}

// List
export async function listServicos() {
	return await prisma.servicos.findMany({
		where: {
			ativo: true,
		},
	})
}
