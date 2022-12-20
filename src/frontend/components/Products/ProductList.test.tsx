import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from '../../domain/Product';
import { ProductList } from './ProductList';

test('Deve exibir uma lista de produtos', () => {
	const productA = new Product(1, 'A', 1234.56);
	const productB = new Product(2, 'B', 7890.12);
	render(<ProductList products={[productA, productB]} onAddProduct={() => {}} />);
	expect(document.getElementsByClassName('product-item')).toHaveLength(2);
});

test('Deve adicionar um produto quando clicar em add', async () => {
	const handleClick = jest.fn();
	const productA = new Product(1, 'A', 1234.56);
	const productB = new Product(2, 'B', 7890.12);
	render(<ProductList products={[productA, productB]} onAddProduct={handleClick} />);
	const addButton = document.getElementsByClassName('product-add-button')[0];
	await waitFor(() => userEvent.click(addButton));
	expect(handleClick).toHaveBeenCalled();
	expect(handleClick).toHaveBeenCalledWith(productA);
});
