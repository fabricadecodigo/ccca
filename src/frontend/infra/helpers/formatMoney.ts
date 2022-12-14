export const formatMoney = function (amount: number) {
	return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(amount);
};
