import { NewsRepository } from "../domain/NewsRepository";
import { News } from "../domain/News";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class CreateNews {
  constructor(private newsRepository: NewsRepository) {}

  async execute(
    title: string,
    description: string,
    locality: string,
    userId: string,
    createdAt: Date
  ): Promise<News> {
    const userIdentifier = Identifier.fromString(userId);
    const news = new News(
      title,
      description,
      locality,
      userIdentifier,
      createdAt
    );

    await this.newsRepository.save(news);
    return news;
  }
}
