type CartItemProps = {
	idProduct: number;
	description: string;
	quantity: number;
	onIncreaseItem: (idProduct: number) => void;
	onDecreaseItem: (idProduct: number) => void;
};

export function CartItem({
	idProduct,
	quantity,
	description,
	onIncreaseItem,
	onDecreaseItem,
}: CartItemProps) {
	return (
		<div key={idProduct} className="cart-item" data-testid="cart-item">
			<span className="item-description">{description}</span>
			<span className="item-quantity">{quantity}</span>
			<button className="item-increase-button" onClick={() => onIncreaseItem(idProduct)}>
				+
			</button>
			<button className="item-decrease-button" onClick={() => onDecreaseItem(idProduct)}>
				-
			</button>
		</div>
	);
}
