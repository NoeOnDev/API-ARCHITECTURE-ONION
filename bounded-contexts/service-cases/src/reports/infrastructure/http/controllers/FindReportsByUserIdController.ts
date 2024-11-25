import { Request, Response } from "express";
import { FindReportsByUserId } from "../../../application/FindReportsByUserId";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindReportsByUserIdController {
  constructor(private findReportsByUserId: FindReportsByUserId) {}

  async handle(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;

    try {
      const reports = await this.findReportsByUserId.execute(userId);
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
