import { Request, Response } from "express";
import { UpdateReportStatus } from "../../../application/UpdateReportStatus";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class UpdateReportStatusController {
  constructor(private updateReportStatus: UpdateReportStatus) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { reportId, status } = req.body;

    try {
      const report = await this.updateReportStatus.execute(reportId, status);
      res.status(200).json(report);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({
            error: "Error updating report status",
            details: errorMessage,
          });
      }
    }
  }
}
