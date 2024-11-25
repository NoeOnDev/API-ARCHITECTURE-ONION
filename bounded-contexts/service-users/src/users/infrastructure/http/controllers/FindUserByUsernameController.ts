import { Request, Response } from "express";
import { FindUserByUsername } from "../../../application/FindUserByUsername";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindUserByUsernameController {
  constructor(private findUserByUsername: FindUserByUsername) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    try {
      const user = await this.findUserByUsername.execute(username.trim());
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
