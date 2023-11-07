import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
export async function createPedido(usuarioId, servicoId) {
	return await prisma.pedidos.create({
		data: {
			usuario_id: usuarioId,
			servico_id: servicoId,
		},
	})
}

// Read
export async function getPedidoById(id) {
	return await prisma.pedidos.findUnique({
		where: { id },
		include: {
			usuario: true,
			servico: true,
		},
	})
}

// Update
export async function updatePedido(id, status) {
	return await prisma.pedidos.update({
		where: { id },
		data: { status },
	})
}

// Delete
export async function deletePedido(id) {
	return await prisma.pedidos.delete({
		where: { id },
	})
}

// List
export async function listPedidos() {
	return await prisma.pedidos.findMany({
		include: {
			usuario: true,
			servico: true,
		},
	})
}