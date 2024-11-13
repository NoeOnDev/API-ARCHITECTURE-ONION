import { Request, Response } from "express";
import { FindUserByEmail } from "../../../application/FindUserByEmail";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindUserByEmailController {
  constructor(private findUserByEmail: FindUserByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const user = await this.findUserByEmail.execute(email);
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
