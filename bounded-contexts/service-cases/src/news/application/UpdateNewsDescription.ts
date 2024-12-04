import { NewsRepository } from "../domain/NewsRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NoNewsFoundError } from "../../_shared/domain/errors/NoNewsFoundError";

export class UpdateNewsDescription {
  constructor(private newsRepository: NewsRepository) {}

  async execute(
    newsId: string,
    newTitle: string,
    newDescription: string
  ): Promise<void> {
    const identifier = Identifier.fromString(newsId);
    const news = await this.newsRepository.findById(identifier);

    if (!news) {
      throw new NoNewsFoundError(newsId);
    }

    news.setTitle(newTitle);
    news.setDescription(newDescription);
    await this.newsRepository.save(news);
  }
}
