import { Request, Response } from "express";
import { RequestPasswordChange } from "../../../application/RequestPasswordChange";

export class RequestPasswordChangeController {
  constructor(private requestPasswordChange: RequestPasswordChange) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    try {
      const userId = await this.requestPasswordChange.execute(email);
      res.status(200).json({
        message: "Password change request has been processed successfully",
        userId: userId,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res
        .status(500)
        .json({ error: "Error processing password change request" });
    }
  }
}
