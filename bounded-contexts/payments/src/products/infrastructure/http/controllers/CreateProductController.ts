import { Request, Response } from "express";
import { CreateProduct } from "../../../application/CreateProduct";

export class CreateProductController {
  constructor(private createProduct: CreateProduct) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { title, description, unitPrice } = req.body;
    try {
      const product = await this.createProduct.execute({
        title,
        description,
        unitPrice,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send("Error creating product");
    }
  }
}
