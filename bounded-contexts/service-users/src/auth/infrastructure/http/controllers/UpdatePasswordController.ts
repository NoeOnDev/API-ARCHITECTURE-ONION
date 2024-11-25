import { Request, Response } from "express";
import { UpdatePassword } from "../../../application/UpdatePassword";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class UpdatePasswordController {
  constructor(private updatePassword: UpdatePassword) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { newPassword } = req.body;
    const userId = req.user.id;
    const eventType = req.user.type;
    try {
      await this.updatePassword.execute(
        userId.trim(),
        newPassword.trim(),
        eventType.trim()
      );
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Password update failed", details: errorMessage });
      }
    }
  }
}
