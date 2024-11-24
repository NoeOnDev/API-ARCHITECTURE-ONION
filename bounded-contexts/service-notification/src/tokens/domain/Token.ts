import { TokenStatus } from "./value-objects/TokenStatus";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";

export class Token {
  private id: Identifier;
  private userId: Identifier;
  private code: string;
  private createdAt: Date;
  private expiresAt: Date;
  private status: TokenStatus;
  private eventType: EventType;

  constructor(
    userId: Identifier,
    code: string,
    expiresAt: Date,
    status: TokenStatus,
    eventType: EventType,
    id?: Identifier,
    createdAt?: Date
  ) {
    this.id = id || Identifier.create();
    this.userId = userId;
    this.code = code;
    this.createdAt = createdAt || new Date();
    this.expiresAt = expiresAt;
    this.status = status;
    this.eventType = eventType;
  }

  markAsUsed(): void {
    this.status = TokenStatus.USED;
  }

  expire(): void {
    if (!this.isExpired()) {
      this.status = TokenStatus.EXPIRED;
    }
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isPending(): boolean {
    return this.status.isPending();
  }

  getId(): Identifier {
    return this.id;
  }

  getUserId(): Identifier {
    return this.userId;
  }

  getCode(): string {
    return this.code;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getExpiresAt(): Date {
    return this.expiresAt;
  }

  getStatus(): TokenStatus {
    return this.status;
  }

  getEventType(): EventType {
    return this.eventType;
  }
}
