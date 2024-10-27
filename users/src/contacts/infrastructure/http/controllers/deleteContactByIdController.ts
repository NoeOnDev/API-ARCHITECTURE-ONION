import { Request, Response } from "express";
import { DeleteContactById } from "../../../application/DeleteContactById";

export class DeleteContactByIdController {
  constructor(private deleteContactById: DeleteContactById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.deleteContactById.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Error deleting contact");
    }
  }
}
