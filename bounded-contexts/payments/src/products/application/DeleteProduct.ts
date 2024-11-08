import { ProductRepository } from "../domain/ProductRepository";

export class DeleteProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<boolean> {
    const product = await this.productRepository.findById(id);
    if (!product) return false;

    await this.productRepository.deleteById(id);
    return true;
  }
}
