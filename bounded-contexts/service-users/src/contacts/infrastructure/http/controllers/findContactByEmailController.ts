import { Request, Response } from "express";
import { FindContactByEmail } from "../../../application/FindContactByEmail";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindContactByEmailController {
  constructor(private findContactByEmail: FindContactByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const contact = await this.findContactByEmail.execute(email.trim());
      res.json(contact);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error retrieving contact" });
      }
    }
  }
}
