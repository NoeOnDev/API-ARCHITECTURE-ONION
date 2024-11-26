import { Request, Response } from "express";
import { UpdateAppointmentStatus } from "../../../application/UpdateAppointmentStatus";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class UpdateAppointmentStatusController {
  constructor(private updateAppointmentStatus: UpdateAppointmentStatus) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { appointmentId, status } = req.body;

    try {
      const appointment = await this.updateAppointmentStatus.execute(
        appointmentId,
        status
      );
      res.status(200).json(appointment);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({
            error: "Error updating appointment status",
            details: errorMessage,
          });
      }
    }
  }
}
