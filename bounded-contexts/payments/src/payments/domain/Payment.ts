import { PaymentStatus } from "./value-objects/PaymentStatus";

export class Payment {
  private id: string;
  private paymentId: string;
  private status: PaymentStatus;
  private createdAt: Date;
  private updatedAt: Date | null;

  constructor(
    paymentId: string,
    status: PaymentStatus = PaymentStatus.PENDING,
    id?: string
  ) {
    this.id = id || crypto.randomUUID();
    this.paymentId = paymentId;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = null;
  }

  approve(): void {
    if (this.status.isApproved()) {
      throw new Error("The payment has already been approved.");
    }
    this.status = PaymentStatus.APPROVED;
    this.updatedAt = new Date();
  }

  reject(): void {
    if (this.status.isRejected()) {
      throw new Error("The payment has already been rejected.");
    }
    this.status = PaymentStatus.REJECTED;
    this.updatedAt = new Date();
  }

  getId(): string {
    return this.id;
  }

  getPaymentId(): string {
    return this.paymentId;
  }

  getStatus(): PaymentStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
