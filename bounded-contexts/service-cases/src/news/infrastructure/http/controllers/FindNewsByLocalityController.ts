import { Request, Response } from "express";
import { FindNewsByLocality } from "../../../application/FindNewsByLocality";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class FindNewsByLocalityController {
  constructor(private findNewsByLocality: FindNewsByLocality) {}

  async handle(req: Request, res: Response): Promise<void> {
    const locality = req.user.locality;
    try {
      const newsList = await this.findNewsByLocality.execute(locality);
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
