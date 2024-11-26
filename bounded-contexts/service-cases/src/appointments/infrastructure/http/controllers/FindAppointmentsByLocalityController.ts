import { Request, Response } from "express";
import { FindAppointmentsByLocality } from "../../../application/FindAppointmentsByLocality";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindAppointmentsByLocalityController {
  constructor(private findAppointmentsByLocality: FindAppointmentsByLocality) {}

  async handle(req: Request, res: Response): Promise<void> {
    const locality = req.user.locality;

    try {
      const appointments = await this.findAppointmentsByLocality.execute(
        locality
      );
      res.status(200).json(appointments);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({
            error: "Error fetching appointments",
            details: errorMessage,
          });
      }
    }
  }
}
