import { Request, Response } from "express";
import { FindNewsByUserId } from "../../../application/FindNewsByUserId";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindNewsByUserIdController {
  constructor(private findNewsByUserId: FindNewsByUserId) {}

  async handle(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    try {
      const newsList = await this.findNewsByUserId.execute(userId);
      res.status(200).json(newsList);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error fetching news", details: errorMessage });
      }
    }
  }
}
