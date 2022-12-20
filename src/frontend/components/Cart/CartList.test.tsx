import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from '../../domain/Product';
import { CartList } from './CartList';

test('Deve exibir uma lista de produtos no carrinho', () => {
	render(
		<CartList
			items={[
				{
					idProduct: 1,
					description: 'A',
					quantity: 1,
				},
				{
					idProduct: 2,
					description: 'B',
					quantity: 1,
				},
			]}
			onIncreaseItem={() => {}}
			onDecreaseItem={() => {}}
		/>
	);
	expect(document.getElementsByClassName('cart-item')).toHaveLength(2);
});

test('Deve incrementar a quantidade de um produto', async () => {
	const handleClick = jest.fn();
	render(
		<CartList
			items={[
				{
					idProduct: 1,
					description: 'A',
					quantity: 1,
				},
				{
					idProduct: 2,
					description: 'B',
					quantity: 1,
				},
			]}
			onIncreaseItem={handleClick}
			onDecreaseItem={() => {}}
		/>
	);
	const increaseButton = document.getElementsByClassName('item-increase-button')[0];
	await waitFor(() => userEvent.click(increaseButton));
	expect(handleClick).toHaveBeenCalled();
	expect(handleClick).toHaveBeenCalledWith(1);
});

test('Deve decrementar a quantidade de um produto', async () => {
	const handleClick = jest.fn();
	render(
		<CartList
			items={[
				{
					idProduct: 1,
					description: 'A',
					quantity: 1,
				},
				{
					idProduct: 2,
					description: 'B',
					quantity: 1,
				},
			]}
			onIncreaseItem={() => {}}
			onDecreaseItem={handleClick}
		/>
	);
	const decreaseButton = document.getElementsByClassName('item-decrease-button')[0];
	await waitFor(() => userEvent.click(decreaseButton));
	expect(handleClick).toHaveBeenCalled();
	expect(handleClick).toHaveBeenCalledWith(1);
});
