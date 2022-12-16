import Coupon from './Coupon';

test('Deve testar o cupom', function () {
	const coupon = new Coupon('VALE20', 20, new Date('2023-01-10T10:00:00'));
	expect(coupon.isExpired()).toBeFalsy();
	expect(coupon.getDiscount(1000)).toBe(200);
});
