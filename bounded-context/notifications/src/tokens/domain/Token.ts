import { TokenStatus } from "./value-objects/TokenStatus";

export class Token {
  private id: string;
  private userId: string;
  private code: string;
  private createdAt: Date;
  private expiresAt: Date;
  private status: TokenStatus;

  constructor(
    id: string,
    userId: string,
    code: string,
    createdAt: Date,
    expiresAt: Date,
    status: TokenStatus
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.code = code;
    this.createdAt = createdAt || new Date();
    this.expiresAt = expiresAt;
    this.status = status;
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

  getId(): string {
    return this.id;
  }

  getUserId(): string {
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
}
