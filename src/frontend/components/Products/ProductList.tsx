import Product from '../../domain/Product';
import { ProductItem } from './ProductItem';

type ProductListProps = {
	products: Product[];
	onAddProduct: (product: Product) => void;
};

export function ProductList({ products, onAddProduct }: ProductListProps) {
	return (
		<>
			{products.map((product) => (
				<ProductItem
					key={product.idProduct}
					product={product}
					onAddProduct={onAddProduct}
				/>
			))}
		</>
	);
}
