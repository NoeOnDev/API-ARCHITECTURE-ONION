import { Request, Response } from "express";
import { ValidateToken } from "../../../application/ValidateToken";

export class ValidateTokenController {
  constructor(private validateToken: ValidateToken) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId, code } = req.body;

    if (!userId || !code) {
      res.status(400).send({ error: "userId and code are required" });
      return;
    }

    try {
      const isValid = await this.validateToken.execute(userId, code);
      if (isValid) {
        res.status(200).send({ message: "Token is valid" });
      } else {
        res.status(400).send({ error: "Invalid token" });
      }
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).send({ error: "Error validating token" });
    }
  }
}
