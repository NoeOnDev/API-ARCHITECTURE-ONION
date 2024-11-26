import { News } from "./News";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface NewsRepository {
  save(news: News): Promise<void>;
  findById(id: Identifier): Promise<News | null>;
  findByLocality(locality: string): Promise<News[]>;
  findByUserId(userId: Identifier): Promise<News[]>;
  deleteById(id: Identifier): Promise<void>;
}
