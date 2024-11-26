import { NewsRepository } from "../domain/NewsRepository";
import { News } from "../domain/News";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NoNewsFoundForUserError } from "../../_shared/domain/errors/NoNewsFoundForUserError";

export class FindNewsByUserId {
  constructor(private newsRepository: NewsRepository) {}

  async execute(userId: string): Promise<News[]> {
    const userIdentifier = Identifier.fromString(userId);
    const newsList = await this.newsRepository.findByUserId(userIdentifier);

    if (newsList.length === 0) {
      throw new NoNewsFoundForUserError(userId);
    }

    return newsList;
  }
}
