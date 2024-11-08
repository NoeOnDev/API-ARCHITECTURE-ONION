import { Request, Response } from "express";
import { GetProductById } from "../../../application/GetProductById";

export class GetProductByIdController {
  constructor(private getProductById: GetProductById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const product = await this.getProductById.execute(id);
      if (!product) {
        res.status(404).send("Product not found");
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).send("Error fetching product");
    }
  }
}
