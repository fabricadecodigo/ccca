import { PrismaClient } from '@prisma/client';
import OrderData from '../../domain/data/OrderData';
import Order from '../../domain/entities/Order';

export default class OrderDataDatabase implements OrderData {
	constructor(readonly prisma: PrismaClient) {}

	async save(order: Order): Promise<void> {
		this.prisma.order.create({
			data: {
				cpf: order.cpf.getValue(),
				total: order.getTotal(),
				code: order.getCode(),
				coupon_code: order.coupon?.code || '',
				coupon_percentage: order.coupon?.percentage || 0,
				email: '',
				freight: order.freight,
				issue_date: order.date,
				sequence: order.sequence,
			},
		});
	}

	async getByCpf(cpf: string): Promise<any> {
		const ordersData = await this.prisma.order.findMany({
			where: {
				cpf,
			},
		});
		return ordersData;
	}

	async count(): Promise<number> {
		const count = await this.prisma.order.count();
		return count;
	}
}
