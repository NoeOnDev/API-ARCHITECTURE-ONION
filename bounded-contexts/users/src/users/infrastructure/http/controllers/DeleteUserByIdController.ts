import { Request, Response } from "express";
import { DeleteUserById } from "../../../application/DeleteUserById";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class DeleteUserByIdController {
  constructor(private deleteUserById: DeleteUserById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.deleteUserById.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error deleting user" });
      }
    }
  }
}
