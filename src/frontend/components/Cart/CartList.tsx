import { CartItem } from './CartItem';

type CartListProps = {
	items: { idProduct: number; description: string; quantity: number }[];
	onIncreaseItem: (idProduct: number) => void;
	onDecreaseItem: (idProduct: number) => void;
};

export function CartList({ items, onIncreaseItem, onDecreaseItem }: CartListProps) {
	return (
		<div className="cart-items" data-testid="cart-items">
			{items.map((item) => (
				<CartItem
					key={item.idProduct}
					idProduct={item.idProduct}
					description={item.description}
					quantity={item.quantity}
					onIncreaseItem={(idProduct) => onIncreaseItem(idProduct)}
					onDecreaseItem={(idProduct) => onDecreaseItem(idProduct)}
				/>
			))}
		</div>
	);
}
