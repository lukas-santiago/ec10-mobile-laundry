import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
export async function createNotificacao(usuarioId, mensagem) {
	return await prisma.notificacoes.create({
		data: {
			usuario_id: usuarioId,
			mensagem: mensagem,
		},
	})
}

// Read
export async function getNotificacaoById(id) {
	return await prisma.notificacoes.findUnique({
		where: { id },
		include: {
			usuario: true,
		},
	})
}

// Update
export async function updateNotificacao(id, mensagem) {
	return await prisma.notificacoes.update({
		where: { id },
		data: { mensagem },
	})
}

// Delete
export async function deleteNotificacao(id) {
	return await prisma.notificacoes.delete({
		where: { id },
	})
}

// List
export async function listNotificacoes() {
	return await prisma.notificacoes.findMany({
		include: {
			usuario: true,
		},
	})
}
