import { Request, Response } from "express";
import { ResendNotification } from "../../../application/ResendNotification";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class ResendNotificationController {
  constructor(private resendNotification: ResendNotification) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId, eventType } = req.body;
    try {
      await this.resendNotification.execute(userId.trim(), eventType.trim());
      res.status(200).json({ message: "Notification resent successfully" });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ message: "Notification resend failed" });
      }
    }
  }
}
