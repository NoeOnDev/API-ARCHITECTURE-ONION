import { Request, Response } from "express";
import { ValidateToken } from "../../../application/ValidateToken";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class ValidateTokenController {
  constructor(private validateToken: ValidateToken) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    const userId = req.body.userId;
    const eventType = req.body.eventType;
    const role = req.body.role;

    try {
      const result = await this.validateToken.execute(
        userId.trim(),
        code.trim(),
        eventType.trim(),
        role.trim()
      );
      res.status(200).send({
        message: "Token is valid",
        jwtToken: result.jwtToken,
        role: result.role,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).send({ error: "Error validating token" });
      }
    }
  }
}
