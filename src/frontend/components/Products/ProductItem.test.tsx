import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from '../../domain/Product';
import { ProductItem } from './ProductItem';

test('Deve exibir as informações de um produto', () => {
	const product = new Product(1, 'Test', 1234.56);
	render(<ProductItem product={product} onAddProduct={() => {}} />);
	const description = document.getElementsByClassName('product-description');
	const price = document.getElementsByClassName('product-price');
	const addButton = document.getElementsByClassName('product-add-button');

	expect(description).toHaveLength(1);
	expect(description.item(0)?.textContent).toBe('Test');
	expect(price).toHaveLength(1);
	expect(price.item(0)?.textContent).toBe('$1,234.56');
	expect(addButton).toHaveLength(1);
});

test('Deve adicionar um produto quando clicar em add', async () => {
	const handleClick = jest.fn();
	const product = new Product(1, 'Test', 1234.56);
	render(<ProductItem product={product} onAddProduct={handleClick} />);
	const addButton = document.getElementsByClassName('product-add-button')[0];
	await waitFor(() => userEvent.click(addButton));
	expect(handleClick).toHaveBeenCalled();
	expect(handleClick).toHaveBeenCalledWith(product);
});
