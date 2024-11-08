import { Payment } from "../../payments/domain/Payment";
import { DonationStatus } from "./value-objects/DonationStatus";

export class Donation {
  private id: string;
  private amount: number;
  private userId: string;
  private status: DonationStatus;
  private createdAt: Date;
  private payment: Payment | null;

  constructor(
    amount: number,
    userId: string,
    id?: string,
    status: DonationStatus = DonationStatus.PENDING,
    payment: Payment | null = null
  ) {
    this.id = id || crypto.randomUUID();
    this.amount = amount;
    this.userId = userId;
    this.status = status;
    this.createdAt = new Date();
    this.payment = payment;
  }

  startDonation(): void {
    if (!this.status.isPending()) {
      throw new Error("The donation has already been started or completed.");
    }
    this.status = DonationStatus.PENDING;
  }

  completeDonation(): void {
    if (
      !this.status.isPending() ||
      !this.payment ||
      !this.payment.getStatus().isApproved()
    ) {
      throw new Error(
        "Cannot complete the donation, the payment is not approved."
      );
    }
    this.status = DonationStatus.COMPLETED;
  }

  failDonation(): void {
    this.status = DonationStatus.FAILED;
  }

  getId(): string {
    return this.id;
  }

  getAmount(): number {
    return this.amount;
  }

  getStatus(): DonationStatus {
    return this.status;
  }

  getUserId(): string {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getPayment(): Payment | null {
    return this.payment;
  }

  setPayment(payment: Payment): void {
    if (this.payment) {
      throw new Error(
        "The payment has already been associated with this donation."
      );
    }
    this.payment = payment;
  }
}
