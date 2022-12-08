import CouponData from '../domain/data/CouponData';
import OrderData from '../domain/data/OrderData';
import ProductData from '../domain/data/ProductData';
import Order from '../domain/entities/Order';
import CurrencyGateway from '../infra/gateway/CurrencyGateway';
import CurrencyGatewayRandom from '../infra/gateway/CurrencyGatewayRandom';

export default class Checkout {
	constructor(
		readonly productData: ProductData,
		readonly couponData: CouponData,
		readonly orderData: OrderData,
		readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom()
	) {}

	async execute(input: Input) {
		const currencies = await this.currencyGateway.getCurrencies();
		const order = new Order(input.cpf);
		for (const item of input.items) {
			const product = await this.productData.getProduct(item.idProduct);
			order.addItem(
				product,
				item.quantity,
				product.currency,
				currencies.getCurrency(product.currency)
			);
		}
		if (input.coupon) {
			const coupon = await this.couponData.getCoupon(input.coupon);
			order.addCoupon(coupon);
		}
		await this.orderData.save(order);
		return {
			code: order.getCode(),
			total: order.getTotal(),
		};
	}
}

type Input = {
	cpf: string;
	email?: string;
	items: { idProduct: number; quantity: number }[];
	coupon?: string;
};
