import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.orderItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.coupon.deleteMany();
    await prisma.order.deleteMany();
    
	await prisma.product.createMany({
		data: [
			{
				idProduct: 1,
				description: 'A',
				price: 1000,
				width: 100,
				height: 30,
				length: 10,
				weight: 3,
				currency: 'BRL',
			},
			{
				idProduct: 2,
				description: 'B',
				price: 5000,
				width: 50,
				height: 50,
				length: 50,
				weight: 22,
				currency: 'BRL',
			},
			{
				idProduct: 3,
				description: 'C',
				price: 30,
				width: 10,
				height: 10,
				length: 10,
				weight: 0.9,
				currency: 'BRL',
			},
			{
				idProduct: 4,
				description: 'D',
				price: 100,
				width: 100,
				height: 30,
				length: 10,
				weight: 3,
				currency: 'USD',
			},
		],
	});

	await prisma.coupon.createMany({
		data: [
			{
				code: 'VALE20',
				percentage: 20,
				expire_date: new Date('2022-12-10T10:00:00'),
			},
			{
				code: 'VALE20_EXPIRED',
				percentage: 20,
				expire_date: new Date('2022-10-01T10:00:00'),
			},
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
