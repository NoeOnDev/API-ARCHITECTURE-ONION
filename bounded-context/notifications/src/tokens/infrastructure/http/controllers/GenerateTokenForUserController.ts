import { Request, Response } from "express";
import { GenerateTokenForUser } from "../../../application/GenerateTokenForUser";

export class GenerateTokenForUserController {
  constructor(private generateTokenForUser: GenerateTokenForUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).send({ error: "userId is required" });
      return;
    }

    try {
      const token = await this.generateTokenForUser.execute(userId);
      res.status(201).send(token);
    } catch (error) {
      res.status(500).send("Error generating token");
      console.error(error);
    }
  }
}
