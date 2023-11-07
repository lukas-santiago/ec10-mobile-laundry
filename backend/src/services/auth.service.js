import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

// Create
export async function register(nome, email, senha) {
	return await prisma.usuarios.create({
		data: { nome, email, senha: hashPassword(senha) },
	})
}

// Read
export async function getUserById(id) {
	return await prisma.usuarios.findUnique({
		where: { id },
	})
}

// Authenticate
export async function authenticate(email, senha) {
	return await prisma.usuarios.findUnique({
		where: { email, senha: hashPassword(senha) },
	})
}

function hashPassword(senha) {
	return crypto.createHash('sha256').update(senha).digest('hex')
}
