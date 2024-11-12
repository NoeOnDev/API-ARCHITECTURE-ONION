import { Request, Response } from "express";
import { ResendNotification } from "../../../application/ResendNotification";

export class ResendNotificationController {
  constructor(private resendNotification: ResendNotification) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId, notificationType } = req.body;

    if (!userId || !notificationType) {
      res
        .status(400)
        .json({ error: "userId and notificationType are required" });
      return;
    }

    try {
      await this.resendNotification.execute(userId, notificationType);
      res.status(200).json({ message: "Notification resent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error resending notification" });
    }
  }
}
