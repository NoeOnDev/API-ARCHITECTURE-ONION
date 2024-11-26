import { Request, Response } from "express";
import { CreateNews } from "../../../application/CreateNews";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class CreateNewsController {
  constructor(private createNews: CreateNews) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { title, description, createdAt } = req.body;
    const userId = req.user.id;
    const locality = req.user.locality;
    try {
      const news = await this.createNews.execute(
        title,
        description,
        locality,
        userId,
        createdAt
      );
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error creating news", details: errorMessage });
      }
    }
  }
}
