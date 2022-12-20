import Checkout from '../application/Checkout';
import CouponDataDatabase from '../infra/data/CouponDataDatabase';
import GetOrderByCpf from '../application/GetOrderByCpf';
import OrderDataDatabase from '../infra/data/OrderDataDatabase';
import ProductDataDatabase from '../infra/data/ProductDataDatabase';
import { prisma } from '../infra/prisma/prisma';

test.skip('Deve consultar um pedido', async function () {
	const productData = new ProductDataDatabase(prisma);
	const couponData = new CouponDataDatabase(prisma);
	const orderData = new OrderDataDatabase(prisma);
	const checkout = new Checkout(productData, couponData, orderData);
	const input = {
		cpf: '987.654.321-00',
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 },
		],
	};
	await checkout.execute(input);
	const getOrderByCpf = new GetOrderByCpf(orderData);
	const output = await getOrderByCpf.execute('987.654.321-00');
	expect(output.total).toBe(6350);
});
