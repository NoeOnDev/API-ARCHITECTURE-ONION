import { NewsRepository } from "../domain/NewsRepository";
import { News } from "../domain/News";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { TextMiningEvent } from "../../_shared/domain/events/TextMiningEvent";

export class CreateNews {
  constructor(
    private newsRepository: NewsRepository,
    private eventPublisher: (event: TextMiningEvent) => Promise<void>
  ) {}

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

    const textMiningEvent = new TextMiningEvent(
      news.getId(),
      "News",
      news.getDescription()
    );

    await this.eventPublisher(textMiningEvent);

    return news;
  }
}
