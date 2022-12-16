import type { NextApiRequest, NextApiResponse } from 'next';
import Checkout from '../../backend/checkout/application/Checkout';
import { CheckoutController } from '../../backend/checkout/controllers/CheckoutController';
import CouponDataDatabase from '../../backend/checkout/infra/data/CouponDataDatabase';
import OrderDataDatabase from '../../backend/checkout/infra/data/OrderDataDatabase';
import ProductDataDatabase from '../../backend/checkout/infra/data/ProductDataDatabase';
import { prisma } from '../../backend/checkout/infra/prisma/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const productData = new ProductDataDatabase(prisma);
	const couponData = new CouponDataDatabase(prisma);
	const orderData = new OrderDataDatabase(prisma);
	const checkout = new Checkout(productData, couponData, orderData);
	const controller = new CheckoutController(checkout);
	return controller.execute(req, res);
}
