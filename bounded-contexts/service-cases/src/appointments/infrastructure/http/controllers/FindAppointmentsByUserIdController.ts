import { Request, Response } from "express";
import { FindAppointmentsByUserId } from "../../../application/FindAppointmentsByUserId";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindAppointmentsByUserIdController {
  constructor(private findAppointmentsByUserId: FindAppointmentsByUserId) {}

  async handle(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;

    try {
      const appointments = await this.findAppointmentsByUserId.execute(userId);
      res.status(200).json(appointments);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({
          error: "Error fetching appointments",
          details: errorMessage,
        });
      }
    }
  }
}
