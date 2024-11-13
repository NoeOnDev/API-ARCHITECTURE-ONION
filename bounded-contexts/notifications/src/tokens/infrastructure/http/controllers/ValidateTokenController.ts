import { Request, Response } from "express";
import { ValidateToken } from "../../../application/ValidateToken";

export class ValidateTokenController {
  constructor(private validateToken: ValidateToken) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId, code, eventType } = req.body;

    if (!userId || !code || !eventType) {
      res
        .status(400)
        .send({ error: "userId, code, and eventType are required" });
      return;
    }

    try {
      const result = await this.validateToken.execute(userId, code, eventType);
      if (result.isValid) {
        res
          .status(200)
          .send({ message: "Token is valid", userId: result.userId });
      } else {
        res.status(400).send({ error: "Invalid token" });
      }
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).send({ error: "Error validating token" });
    }
  }
}
