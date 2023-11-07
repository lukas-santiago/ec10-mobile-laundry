/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function seed() {
	try {
		// Criando usuário admin
		await prisma.usuarios.create({
			data: {
				nome: 'admin',
				email: 'admin',
				senha: crypto
					.createHash('sha256')
					.update('admin')
					.digest('hex'),
				isAdmin: true,
			},
		})

		// Criando servicos da lavanderia
		await prisma.servicos.createMany({
			data: [
				{
					nome: 'Lavagem simples',
					descricao: 'Lavagem simples de roupa',
					preco: 10.99,
				},
				{
					nome: 'Lavagem completa',
					descricao: 'Lavagem completa de roupa',
					preco: 15.99,
				},
				{
					nome: 'Secagem',
					descricao: 'Secagem de roupa',
					preco: 5.99,
				},
			],
		})

        // Criando pedidos
        await prisma.pedidos.createMany({
            data: [
                {
                    usuario_id: 1,
                    servico_id: 1,
                },
                {
                    usuario_id: 1,
                    servico_id: 2,
                },
                {
                    usuario_id: 1,
                    servico_id: 3,
                },
            ]
        })

		console.log('Seeding completed!')
	} catch (error) {
		console.error('Error seeding database:', error)
	} finally {
		await prisma.$disconnect()
	}
}

seed()
