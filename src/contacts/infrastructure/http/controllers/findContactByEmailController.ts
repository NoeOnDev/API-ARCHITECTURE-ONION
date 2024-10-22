import { Request, Response } from "express";
import { FindContactByEmail } from "../../../application/FindContactByEmail";

export class FindContactByEmailController {
  constructor(private findContactByEmail: FindContactByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const contact = await this.findContactByEmail.execute(email);
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).send("Contact not found");
      }
    } catch (error) {
      res.status(500).send("Error retrieving contact");
    }
  }
}
