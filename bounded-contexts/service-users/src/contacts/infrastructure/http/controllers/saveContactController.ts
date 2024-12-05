import { Request, Response } from "express";
import { SaveContact } from "../../../application/SaveContact";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";
import logger from "../../../../_config/logger";

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
        logger.error(`Error: ${error.message}`);
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        logger.error(`Error: ${errorMessage}`);
        res
          .status(500)
          .json({ error: "Error saving contact", details: errorMessage });
      }
    }
  }
}