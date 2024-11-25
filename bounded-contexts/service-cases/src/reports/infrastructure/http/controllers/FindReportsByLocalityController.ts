import { Request, Response } from "express";
import { FindReportsByLocality } from "../../../application/FindReportsByLocality";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindReportsByLocalityController {
  constructor(private findReportsByLocality: FindReportsByLocality) {}

  async handle(req: Request, res: Response): Promise<void> {
    const locality = req.user.locality;

    try {
      const reports = await this.findReportsByLocality.execute(locality);
      res.status(200).json(reports);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error fetching reports", details: errorMessage });
      }
    }
  }
}
