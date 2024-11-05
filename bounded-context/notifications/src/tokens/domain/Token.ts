export class Token {
  private id: string;
  private userId: string;
  private code: string;
  private createdAt: Date;
  private expiresAt: Date;
  private status: "PENDING" | "USED" | "EXPIRED";

  constructor(
    id: string,
    userId: string,
    code: string,
    createdAt: Date,
    expiresAt: Date,
    status: "PENDING" | "USED" | "EXPIRED"
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.code = code;
    this.createdAt = createdAt || new Date();
    this.expiresAt = expiresAt;
    this.status = status;
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

  getStatus(): "PENDING" | "USED" | "EXPIRED" {
    return this.status;
  }
}
