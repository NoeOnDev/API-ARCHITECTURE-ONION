import { Request, Response } from "express";
import { UpdatePassword } from "../../../application/UpdatePassword";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class UpdatePasswordController {
  constructor(private updatePassword: UpdatePassword) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { newPassword } = req.body;
    const userId = req.body.userId;
    try {
      await this.updatePassword.execute(userId.trim(), newPassword.trim());
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ message: "Password update failed" });
      }
    }
  }
}
