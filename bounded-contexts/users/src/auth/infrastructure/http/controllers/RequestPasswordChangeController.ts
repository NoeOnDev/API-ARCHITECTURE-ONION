import { Request, Response } from "express";
import { RequestPasswordChange } from "../../../application/RequestPasswordChange";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class RequestPasswordChangeController {
  constructor(private requestPasswordChange: RequestPasswordChange) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    try {
      const userId = await this.requestPasswordChange.execute(email.trim());
      res.status(200).json({
        message: "Password change request has been processed successfully",
        userId: userId,
      });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ message: "Password change request failed" });
      }
    }
  }
}
