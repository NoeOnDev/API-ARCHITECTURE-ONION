import { Request, Response } from "express";
import { ExistsUserByEmail } from "../../../application/ExistsUserByEmail";

export class ExistsUserByEmailController {
  constructor(private existsUserByEmail: ExistsUserByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const exists = await this.existsUserByEmail.execute(email);
      res.json({ exists });
    } catch (error) {
      res.status(500).send("Error checking if user exists by email");
    }
  }
}
