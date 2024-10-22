import { Request, Response } from "express";
import { FindContactById } from "../../../application/FindContactById";

export class FindContactByIdController {
  constructor(private findContactById: FindContactById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const contact = await this.findContactById.execute(id);
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
