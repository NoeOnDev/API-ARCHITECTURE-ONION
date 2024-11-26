import { NewsRepository } from "../domain/NewsRepository";
import { News } from "../domain/News";
import { NoNewsFoundForLocalityError } from "../../_shared/domain/errors/NoNewsFoundForLocalityError";

export class FindNewsByLocality {
  constructor(private newsRepository: NewsRepository) {}

  async execute(locality: string): Promise<News[]> {
    const newsList = await this.newsRepository.findByLocality(locality);

    if (newsList.length === 0) {
      throw new NoNewsFoundForLocalityError(locality);
    }

    return newsList;
  }
}
