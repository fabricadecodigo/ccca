import { useEffect, useReducer } from 'react';
import { CartList } from '../components/Cart/CartList';
import { Total } from '../components/Order/Total';
import { ProductList } from '../components/Products/ProductList';
import { Title } from '../components/Shared/Title';
import { checkoutGateway } from '../container/container';
import Order from '../domain/Order';

type State = {
	products: { idProduct: number; description: string; price: number }[];
	order: Order;
	message: string;
};

const initialState: State = {
	products: [
		{ idProduct: 1, description: 'A', price: 1000 },
		{ idProduct: 2, description: 'B', price: 5000 },
		{ idProduct: 3, description: 'C', price: 30 },
	],
	order: new Order('987.654.321-00'),
	message: '',
};

function reducer(state: State) {
	return { ...state };
}

export function CheckoutPage() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getProductById = function (idProduct: number) {
		return state.products.find((product: any) => product.idProduct === idProduct);
	};

	const confirm = async function (order: Order) {
		const orderData = await checkoutGateway.checkout(order);
		order.code = orderData.code;
		order.total = orderData.total;
		state.message = 'Success';
		dispatch();
	};

	const clearCart = function () {
		state.order = new Order('987.654.321-00');
		dispatch();
	};

	return (
		<>
			<Title>Checkout</Title>
			<ProductList
				products={state.products}
				onAddProduct={(product) => {
					state.order.addItem(product);
					dispatch();
				}}
			/>
			{/* cart total */}
			<Total id="cart-total" value={state.order.getTotal()} />
			<CartList
				items={state.order.items.map((item) => ({
					idProduct: item.idProduct,
					description: getProductById(item.idProduct)?.description || '',
					quantity: item.quantity,
				}))}
				onIncreaseItem={(idProduct) => {
					state.order.increaseItem(idProduct);
					dispatch();
				}}
				onDecreaseItem={(idProduct) => {
					state.order.decreaseItem(idProduct);
					dispatch();
				}}
			/>
			<button className="confirm" onClick={() => confirm(state.order)}>
				confirm
			</button>
			<button className="confirm" onClick={() => clearCart()}>
				clear cart
			</button>
			<div className="message" data-testid="message">
				{state.message}
			</div>
			<div className="order-code" data-testid="order-code">
				{state.order.code}
			</div>
			{/* order total */}
			<Total id="order-total" data-testid="order-total" value={state.order.total} />
		</>
	);
}
