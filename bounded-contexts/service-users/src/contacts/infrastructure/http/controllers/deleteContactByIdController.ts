import { Request, Response } from "express";
import { DeleteContactById } from "../../../application/DeleteContactById";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class DeleteContactByIdController {
  constructor(private deleteContactById: DeleteContactById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.deleteContactById.execute(id.trim());
      res.status(204).send();
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error deleting contact", details: errorMessage });
      }
    }
  }
}
