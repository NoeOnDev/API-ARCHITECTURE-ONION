import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { AppointmentStatus } from "./value-objects/AppointmentStatus";
import { TextProcessingStatus } from "../../_shared/domain/value-objects/TextProcessingStatus";

export class Appointment {
  private id: Identifier;
  private title: string;
  private userName: string;
  private userId: Identifier;
  private description: string;
  private dateTime: Date;
  private locality: string;
  private status: AppointmentStatus;
  private processingStatus: TextProcessingStatus;

  constructor(
    title: string,
    userName: string,
    userId: Identifier,
    description: string,
    dateTime: Date,
    locality: string,
    status: AppointmentStatus = AppointmentStatus.PENDING,
    processingStatus: TextProcessingStatus = TextProcessingStatus.PENDING,
    id?: Identifier
  ) {
    this.id = id || Identifier.create();
    this.title = title.trim();
    this.userName = userName.trim();
    this.userId = userId;
    this.description = description.trim();
    this.dateTime = dateTime;
    this.locality = locality.trim();
    this.status = status;
    this.processingStatus = processingStatus;
  }

  getId(): Identifier {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getUserName(): string {
    return this.userName;
  }

  getUserId(): Identifier {
    return this.userId;
  }

  getDescription(): string {
    return this.description;
  }

  getDateTime(): Date {
    return this.dateTime;
  }

  getLocality(): string {
    return this.locality;
  }

  getStatus(): AppointmentStatus {
    return this.status;
  }

  getProcessingStatus(): TextProcessingStatus {
    return this.processingStatus;
  }

  setDescription(description: string): void {
    this.description = description.trim();
  }

  setStatus(status: AppointmentStatus): void {
    this.status = status;
  }

  setProcessingStatus(processingStatus: TextProcessingStatus): void {
    this.processingStatus = processingStatus;
  }

  accept(): void {
    this.status = AppointmentStatus.ACCEPTED;
  }

  reject(): void {
    this.status = AppointmentStatus.REJECTED;
  }

  isPending(): boolean {
    return this.status.isPending();
  }
}
