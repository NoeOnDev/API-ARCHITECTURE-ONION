import { Request, Response } from "express";
import { FindUserById } from "../../../application/FindUserById";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindUserByIdController {
  constructor(private findUserById: FindUserById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const id = req.user.id;
    try {
      const user = await this.findUserById.execute(id.trim());
      res.json(user);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error retrieving user", details: errorMessage });
      }
    }
  }
}
