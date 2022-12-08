import { PrismaClient } from '@prisma/client';
import ProductData from '../../domain/data/ProductData';
import Product from '../../domain/entities/Product';

export default class ProductDataDatabase implements ProductData {
	constructor(readonly prisma: PrismaClient) {}

	async getProduct(idProduct: number): Promise<Product> {
		const productData = await this.prisma.product.findUnique({
			where: {
				idProduct: idProduct,
			},
		});

		if (!productData) throw new Error('Product not found');
		return new Product(
			productData.id,
			productData.description,
			productData.price,
			productData.width,
			productData.height,
			productData.length,
			productData.weight,
			productData.currency
		);
	}
}
