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
        code.trim(),
        eventType.trim(),
        role.trim(),
        locality.trim(),
        firstName.trim(),
        email.trim(),
        phone.trim()
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
