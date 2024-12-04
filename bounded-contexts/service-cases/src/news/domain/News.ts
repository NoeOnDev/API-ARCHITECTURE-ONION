import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { TextProcessingStatus } from "../../_shared/domain/value-objects/TextProcessingStatus";

export class News {
  private id: Identifier;
  private title: string;
  private description: string;
  private locality: string;
  private userId: Identifier;
  private createdAt: Date;
  private processingStatus: TextProcessingStatus;

  constructor(
    title: string,
    description: string,
    locality: string,
    userId: Identifier,
    createdAt: Date,
    processingStatus: TextProcessingStatus = TextProcessingStatus.PENDING,
    id?: Identifier
  ) {
    this.id = id || Identifier.create();
    this.title = title.trim();
    this.description = description.trim();
    this.locality = locality.trim();
    this.userId = userId;
    this.createdAt = createdAt;
    this.processingStatus = processingStatus;
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

  getProcessingStatus(): TextProcessingStatus {
    return this.processingStatus;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setProcessingStatus(processingStatus: TextProcessingStatus): void {
    this.processingStatus = processingStatus;
  }
}
