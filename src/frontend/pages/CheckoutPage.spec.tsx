import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutPage } from './CheckoutPage';
import { unmountComponentAtNode } from 'react-dom';
import { checkoutGateway } from '../container/container';
import CheckoutGatewayHttp from '../infra/gateway/CheckoutGatewayHttp';

afterEach(() => {
	jest.clearAllMocks();
});

test('Deve ter um pedido vazio', function () {
	render(<CheckoutPage />);
	expect(screen.queryAllByTestId('cart-item')).toHaveLength(0);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	expect(clearButton).toBeInTheDocument();
});

test('Deve ter um pedido com um item', async function () {
	render(<CheckoutPage />);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	await waitFor(() => userEvent.click(clearButton));

	const addButton = screen.getAllByText('add');
	await waitFor(() => userEvent.click(addButton[0]));
	expect(screen.getByTestId('cart-total').textContent).toBe('$1,000.00');
});

test('Deve ter um pedido com vários itens e quantidade acima de 1', async () => {
	render(<CheckoutPage />);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	await waitFor(() => userEvent.click(clearButton));

	const addButton = screen.getAllByText('add');
	await waitFor(() => userEvent.click(addButton[0]));
	await waitFor(() => userEvent.click(addButton[1]));
	await waitFor(() => userEvent.click(addButton[2]));
	await waitFor(() => userEvent.click(addButton[2]));
	await waitFor(() => userEvent.click(addButton[2]));
	expect(screen.getByTestId('cart-total').textContent).toBe('$6,090.00');
});

test('Deve ter um pedido com vários itens e decrementar a quantitidade do item do pedido', async () => {
	render(<CheckoutPage />);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	await waitFor(() => userEvent.click(clearButton));

	const addButton = screen.getAllByText('add');
	await waitFor(() => userEvent.click(addButton[0]));
	await waitFor(() => userEvent.click(addButton[1]));
	await waitFor(() => userEvent.click(addButton[2]));
	await waitFor(() => userEvent.click(addButton[2]));
	await waitFor(() => userEvent.click(addButton[2]));
	const decreaseItem = screen.getAllByText('-');

	await waitFor(() => userEvent.click(decreaseItem[2]));
	await waitFor(() => userEvent.click(decreaseItem[2]));

	expect(screen.getByTestId('cart-total').textContent).toBe('$6,030.00');
});

test('Deve ter um pedido com vários itens e incrementar a quantitidade do item do pedido', async function () {
	render(<CheckoutPage />);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	await waitFor(() => userEvent.click(clearButton));
	const addButton = screen.getAllByText('add');
	await waitFor(() => userEvent.click(addButton[0]));
	const increaseItem = screen.getAllByText('+');
	await waitFor(() => userEvent.click(increaseItem[0]));
	await waitFor(() => userEvent.click(increaseItem[0]));
	expect(screen.getByTestId('cart-total').textContent).toBe('$3,000.00');
});

test('Deve ter um pedido com vários itens e decrementar a quantitidade do item do pedido e não permitir que a quantidade seja menor que zero', async function () {
	render(<CheckoutPage />);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	await waitFor(() => userEvent.click(clearButton));
	const addButton = screen.getAllByText('add');
	await waitFor(() => userEvent.click(addButton[0]));
	const decreaseItem = screen.getAllByText('-');
	await waitFor(() => userEvent.click(decreaseItem[0]));
	await waitFor(() => userEvent.click(decreaseItem[0]));
	expect(screen.getByTestId('cart-total').textContent).toBe('$0.00');
});

test('Deve confirmar um pedido com um item', async function () {
	const checkoutGatewayHttpMock = jest
		.spyOn(CheckoutGatewayHttp.prototype, 'checkout')
		.mockImplementation(async () => {
			return {
				code: '202200000010',
				total: 1030.0,
			};
		});

	render(<CheckoutPage />);
	const clearButton = screen.getByRole('button', { name: 'clear cart' });
	await waitFor(() => userEvent.click(clearButton));

	const addButton = screen.getAllByText('add');
	await waitFor(() => userEvent.click(addButton[0]));
	const confirmButton = screen.getByRole('button', { name: 'confirm' });
	await waitFor(() => userEvent.click(confirmButton));

	// await sleep(100);
	const message = screen.getByTestId('message');
	const orderCode = screen.getByTestId('order-code');
	const orderTotal = screen.getByTestId('order-total');
	expect(message.textContent).toBe('Success');
	expect(orderCode.textContent).toBe('202200000010');
	expect(orderTotal.textContent).toBe('$1,030.00');
	expect(checkoutGatewayHttpMock).toHaveBeenCalled();
});
