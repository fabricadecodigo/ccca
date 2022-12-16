import OrderData from '../domain/data/OrderData';

export default class GetOrderByCpf {
	constructor(readonly orderData: OrderData) {}

	async execute(cpf: string): Promise<Output> {
		const order = await this.orderData.getByCpf(cpf);
		return {
			total: 0,
		};
	}
}

type Output = {
	total: number;
};
