import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItem } from './CartItem';

test('Deve exibir as informações de um produto no carrinho', () => {
	render(
		<CartItem
			idProduct={1}
			description="Test"
			quantity={2}
			onIncreaseItem={() => {}}
			onDecreaseItem={() => {}}
		/>
	);

	const description = document.getElementsByClassName('item-description');
	const quantity = document.getElementsByClassName('item-quantity');
	const increaseButton = document.getElementsByClassName('item-increase-button');
	const decreaseButton = document.getElementsByClassName('item-decrease-button');
	expect(description).toHaveLength(1);
	expect(description.item(0)?.textContent).toBe('Test');
	expect(quantity).toHaveLength(1);
	expect(quantity.item(0)?.textContent).toBe('2');
	expect(increaseButton).toHaveLength(1);
	expect(decreaseButton).toHaveLength(1);
});

test('Deve incrementar a quantidade de um', async () => {
	const handleClick = jest.fn();
	render(
		<CartItem
			idProduct={1}
			description="Test"
			quantity={2}
			onIncreaseItem={handleClick}
			onDecreaseItem={() => {}}
		/>
	);

	const increaseButton = document.getElementsByClassName('item-increase-button')[0];
	await waitFor(() => userEvent.click(increaseButton));
	expect(handleClick).toHaveBeenCalled();
	expect(handleClick).toHaveBeenCalledWith(1);
});

test('Deve decrementar a quantidade de um', async () => {
	const handleClick = jest.fn();
	render(
		<CartItem
			idProduct={2}
			description="Test"
			quantity={2}
			onIncreaseItem={() => {}}
			onDecreaseItem={handleClick}
		/>
	);

	const decreaseButton = document.getElementsByClassName('item-decrease-button')[0];
	await waitFor(() => userEvent.click(decreaseButton));
	expect(handleClick).toHaveBeenCalled();
	expect(handleClick).toHaveBeenCalledWith(2);
});
