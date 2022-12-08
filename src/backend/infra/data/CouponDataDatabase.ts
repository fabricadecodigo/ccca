import { PrismaClient } from '@prisma/client';
import CouponData from '../../domain/data/CouponData';
import Coupon from '../../domain/entities/Coupon';

export default class CouponDataDatabase implements CouponData {
	constructor(readonly prisma: PrismaClient) {}

	async getCoupon(code: string): Promise<Coupon> {
		const couponData = await this.prisma.coupon.findUnique({
			where: {
				code,
			},
		});
		if (!couponData) throw new Error('Coupon not found');
		return new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
	}
}
