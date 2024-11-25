import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { ReportAddress } from "./value-objects/ReportAddress";
import { ReportCategory } from "./value-objects/ReportCategory";
import { ReportStatus } from "./value-objects/ReportStatus";

export class Report {
  private id: Identifier;
  private title: string;
  private category: ReportCategory;
  private description: string;
  private address: ReportAddress;
  private userId: Identifier;
  private createdAt: Date;
  private status: ReportStatus;

  constructor(
    title: string,
    category: ReportCategory,
    description: string,
    address: ReportAddress,
    userId: Identifier,
    id?: Identifier,
    createdAt?: Date,
    status: ReportStatus = ReportStatus.PENDING
  ) {
    this.id = id || Identifier.create();
    this.title = title.trim();
    this.category = category;
    this.description = description.trim();
    this.address = address;
    this.userId = userId;
    this.createdAt = createdAt || new Date();
    this.status = status;
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

  setStatus(status: ReportStatus): void {
    this.status = status;
  }
}
