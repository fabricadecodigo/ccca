import Product from '../../domain/Product';
import { formatMoney } from '../../infra/helpers/formatMoney';

type ProductItemProps = {
	product: Product;
	onAddProduct: (product: Product) => void;
};

export function ProductItem({ product, onAddProduct }: ProductItemProps) {
	return (
		<div className='product-item' key={product.idProduct}>
			<span className="product-description">{product.description}</span>
			<span className="product-price">{formatMoney(product.price)}</span>
			<button className="product-add-button" onClick={() => onAddProduct(product)}>
				add
			</button>
		</div>
	);
}
