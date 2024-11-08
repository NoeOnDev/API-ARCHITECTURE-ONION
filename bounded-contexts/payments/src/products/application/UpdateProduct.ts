import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";

interface UpdateProductRequest {
  id: string;
  title: string;
  description: string;
  unitPrice: number;
}

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<Product | null> {
    const { id, title, description, unitPrice } = request;
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) return null;

    const product = new Product(title, description, unitPrice, id);
    await this.productRepository.update(product);
    return product;
  }
}
