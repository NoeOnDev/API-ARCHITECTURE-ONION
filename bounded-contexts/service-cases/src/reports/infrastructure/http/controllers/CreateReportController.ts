import { Request, Response } from "express";
import { CreateReport } from "../../../application/CreateReport";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class CreateReportController {
  constructor(private createReport: CreateReport) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { title, category, description, locality, street } = req.body;
    const userId = req.user.id;

    try {
      const report = await this.createReport.execute(
        userId,
        title,
        category,
        description,
        locality,
        street
      );
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error creating report", details: errorMessage });
      }
    }
  }
}
