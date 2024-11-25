import { Request, Response } from "express";
import { ValidateToken } from "../../../application/ValidateToken";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class ValidateTokenController {
  constructor(private validateToken: ValidateToken) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    const userId = req.user.id;
    const eventType = req.user.type;
    const role = req.user.role;
    const locality = req.user.locality;
    const firstName = req.user.firstName;
    const email = req.user.email;
    const phone = req.user.phone;
    try {
      const result = await this.validateToken.execute(
        userId.trim(),
        code,
        eventType,
        role,
        locality,
        firstName,
        email,
        phone
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
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error validating token", details: errorMessage });
      }
    }
  }
}
