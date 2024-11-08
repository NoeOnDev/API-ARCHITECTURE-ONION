import { Request, Response } from "express";
import { DeleteProduct } from "../../../application/DeleteProduct";

export class DeleteProductController {
  constructor(private deleteProduct: DeleteProduct) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deleted = await this.deleteProduct.execute(id);
      if (!deleted) {
        res.status(404).send("Product not found");
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Error deleting product");
    }
  }
}
