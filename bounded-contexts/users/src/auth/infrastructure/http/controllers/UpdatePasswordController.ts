import { Request, Response } from "express";
import { UpdatePassword } from "../../../application/UpdatePassword";

export class UpdatePasswordController {
  constructor(private updatePassword: UpdatePassword) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId, newPassword } = req.body;

    try {
      await this.updatePassword.execute(userId, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          res.status(404).json({ error: "User not found" });
          return;
        }
        if (error.message === "User not verified") {
          res.status(403).json({ error: "User not verified" });
          return;
        }
      }
      res.status(500).json({ error: "Error updating password" });
    }
  }
}
