import { Request, Response } from "express";
import { GetAllProducts } from "../../../application/GetAllProducts";

export class GetAllProductsController {
  constructor(private getAllProducts: GetAllProducts) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const products = await this.getAllProducts.execute();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Error fetching products");
    }
  }
}
