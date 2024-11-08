import { Request, Response } from "express";
import { UpdateProduct } from "../../../application/UpdateProduct";

export class UpdateProductController {
  constructor(private updateProduct: UpdateProduct) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, description, unitPrice } = req.body;

    try {
      const product = await this.updateProduct.execute({
        id,
        title,
        description,
        unitPrice,
      });

      if (!product) {
        res.status(404).send("Product not found");
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).send("Error updating product");
    }
  }
}
