import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class News {
  private id: Identifier;
  private title: string;
  private description: string;
  private locality: string;
  private userId: Identifier;
  private createdAt: Date;

  constructor(
    title: string,
    description: string,
    locality: string,
    userId: Identifier,
    createdAt: Date,
    id?: Identifier
  ) {
    this.id = id || Identifier.create();
    this.title = title.trim();
    this.description = description.trim();
    this.locality = locality.trim();
    this.userId = userId;
    this.createdAt = createdAt;
  }

  getId(): Identifier {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getLocality(): string {
    return this.locality;
  }

  getUserId(): Identifier {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
