import { Request, Response } from "express";
import { ExistsUserByUsername } from "../../../application/ExistsUserByUsername";

export class ExistsUserByUsernameController {
  constructor(private existsUserByUsername: ExistsUserByUsername) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    try {
      const exists = await this.existsUserByUsername.execute(username);
      res.json({ exists });
    } catch (error) {
      res.status(500).send("Error checking if user exists by username");
    }
  }
}
