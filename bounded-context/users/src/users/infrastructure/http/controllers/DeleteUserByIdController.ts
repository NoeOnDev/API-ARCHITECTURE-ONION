import { Request, Response } from "express";
import { DeleteUserById } from "../../../application/DeleteUserById";

export class DeleteUserByIdController {
  constructor(private deleteUserById: DeleteUserById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.deleteUserById.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Error deleting user");
    }
  }
}
