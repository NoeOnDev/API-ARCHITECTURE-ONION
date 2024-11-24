import { Request, Response } from "express";
import { FindContactById } from "../../../application/FindContactById";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindContactByIdController {
  constructor(private findContactById: FindContactById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const contact = await this.findContactById.execute(id.trim());
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
