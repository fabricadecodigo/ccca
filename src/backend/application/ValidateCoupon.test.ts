import ValidateCoupon from '../application/ValidateCoupon';
import CouponDataDatabase from '../infra/data/CouponDataDatabase';
import { prisma } from './../infra/prisma/prisma';

test('Deve validar um cupom de desconto', async function () {
	const couponData = new CouponDataDatabase(prisma);
	const validateCoupon = new ValidateCoupon(couponData);
	const output = await validateCoupon.execute('VALE20', 1000);
	expect(output.isExpired).toBeFalsy();
	expect(output.discount).toBe(200);
});
