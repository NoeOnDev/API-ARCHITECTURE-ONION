import { Request, Response } from "express";
import { RequestPasswordChange } from "../../../application/RequestPasswordChange";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class RequestPasswordChangeController {
  constructor(private requestPasswordChange: RequestPasswordChange) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    try {
      const token = await this.requestPasswordChange.execute(email.trim());
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({
            error: "Password change request failed",
            details: errorMessage,
          });
      }
    }
  }
}
