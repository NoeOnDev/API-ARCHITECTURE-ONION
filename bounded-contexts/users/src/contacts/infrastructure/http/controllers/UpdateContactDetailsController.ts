import { Request, Response } from "express";
import { UpdateContactDetails } from "../../../application/UpdateContactDetails";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class UpdateContactDetailsController {
  constructor(private readonly updateContactDetails: UpdateContactDetails) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, hobby } = req.body;
    const userId = req.user.id;
    try {
      await this.updateContactDetails.execute(
        userId,
        firstName,
        lastName,
        hobby
      );

      res.status(200).json({ message: "Contact details updated successfully" });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update contact details" });
      }
    }
  }
}
