import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";

export class GetProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
