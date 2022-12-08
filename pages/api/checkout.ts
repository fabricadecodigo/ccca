import type { NextApiRequest, NextApiResponse } from 'next';
import Checkout from '../../src/backend/application/Checkout';
import CouponDataDatabase from '../../src/backend/infra/data/CouponDataDatabase';
import OrderDataDatabase from '../../src/backend/infra/data/OrderDataDatabase';
import ProductDataDatabase from '../../src/backend/infra/data/ProductDataDatabase';
import { prisma } from '../../src/backend/infra/prisma/prisma';
import { CheckoutController } from './../../src/backend/controllers/CheckoutController';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const productData = new ProductDataDatabase(prisma);
	const couponData = new CouponDataDatabase(prisma);
	const orderData = new OrderDataDatabase(prisma);
	const checkout = new Checkout(productData, couponData, orderData);
	const controller = new CheckoutController(checkout);
	return controller.execute(req, res);
}
