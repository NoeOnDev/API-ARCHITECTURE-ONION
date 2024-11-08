import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";

interface CreateProductRequest {
  title: string;
  description: string;
  unitPrice: number;
}

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { title, description, unitPrice } = request;
    const product = new Product(title, description, unitPrice);
    await this.productRepository.save(product);
    return product;
  }
}
