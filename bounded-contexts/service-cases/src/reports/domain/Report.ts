import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { ReportAddress } from "./value-objects/ReportAddress";
import { ReportCategory } from "./value-objects/ReportCategory";
import { ReportStatus } from "./value-objects/ReportStatus";
import { TextProcessingStatus } from "../../_shared/domain/value-objects/TextProcessingStatus";

export class Report {
  private id: Identifier;
  private title: string;
  private category: ReportCategory;
  private description: string;
  private address: ReportAddress;
  private userId: Identifier;
  private createdAt: Date;
  private status: ReportStatus;
  private processingStatus: TextProcessingStatus;

  constructor(
    title: string,
    category: ReportCategory,
    description: string,
    address: ReportAddress,
    userId: Identifier,
    createdAt: Date,
    id?: Identifier,
    status: ReportStatus = ReportStatus.PENDING,
    processingStatus: TextProcessingStatus = TextProcessingStatus.PENDING
  ) {
    this.id = id || Identifier.create();
    this.title = title.trim();
    this.category = category;
    this.description = description.trim();
    this.address = address;
    this.userId = userId;
    this.createdAt = createdAt;
    this.status = status;
    this.processingStatus = processingStatus;
  }

  getId(): Identifier {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getCategory(): ReportCategory {
    return this.category;
  }

  getDescription(): string {
    return this.description;
  }

  getAddress(): ReportAddress {
    return this.address;
  }

  getUserId(): Identifier {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getStatus(): ReportStatus {
    return this.status;
  }

  getProcessingStatus(): TextProcessingStatus {
    return this.processingStatus;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setStatus(status: ReportStatus): void {
    this.status = status;
  }

  setProcessingStatus(processingStatus: TextProcessingStatus): void {
    this.processingStatus = processingStatus;
  }
}
