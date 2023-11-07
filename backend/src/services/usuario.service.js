import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
export async function createUser(nome, email, senha) {
	return await prisma.usuarios.create({
		data: { nome, email, senha },
	})
}

// Read
export async function getUserById(id) {
	return await prisma.usuarios.findUnique({
		where: { id },
	})
}

// Update
export async function updateUser(id, nome, email, senha) {
	return await prisma.usuarios.update({
		where: { id },
		data: { nome, email, senha },
	})
}

// Delete
export async function deleteUser(id) {
	return await prisma.usuarios.delete({
		where: { id },
	})
}

// List
export async function listUsers() {
	return await prisma.usuarios.findMany()
}
