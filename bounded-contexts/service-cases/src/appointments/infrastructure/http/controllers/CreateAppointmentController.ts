import { Request, Response } from "express";
import { CreateAppointment } from "../../../application/CreateAppointment";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class CreateAppointmentController {
  constructor(private createAppointment: CreateAppointment) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { title, description, dateTime } = req.body;
    const userId = req.user.id;
    const userName = req.user.firstName;
    const locality = req.user.locality;

    try {
      const appointment = await this.createAppointment.execute(
        userId,
        title,
        userName,
        description,
        new Date(dateTime),
        locality
      );
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error creating appointment", details: errorMessage });
      }
    }
  }
}
