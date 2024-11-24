import { Request, Response } from "express";
import { SaveContact } from "../../../application/SaveContact";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class SaveContactController {
  constructor(private saveContact: SaveContact) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone, hobby } = req.body;
    try {
      const contact = await this.saveContact.execute(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        phone.trim(),
        hobby.trim()
      );
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error saving contact" });
      }
    }
  }
}
