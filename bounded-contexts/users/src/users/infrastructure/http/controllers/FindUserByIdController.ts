import { Request, Response } from "express";
import { FindUserById } from "../../../application/FindUserById";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindUserByIdController {
  constructor(private findUserById: FindUserById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.findUserById.execute(id);
      res.json(user);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error retrieving user" });
      }
    }
  }
}
