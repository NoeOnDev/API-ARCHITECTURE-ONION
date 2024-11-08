export class PaymentStatus {
  private readonly value: "PENDING" | "APPROVED" | "REJECTED";

  private constructor(value: "PENDING" | "APPROVED" | "REJECTED") {
    this.value = value;
  }

  static PENDING = new PaymentStatus("PENDING");
  static APPROVED = new PaymentStatus("APPROVED");
  static REJECTED = new PaymentStatus("REJECTED");

  static from(value: string): PaymentStatus {
    switch (value) {
      case "PENDING":
        return PaymentStatus.PENDING;
      case "APPROVED":
        return PaymentStatus.APPROVED;
      case "REJECTED":
        return PaymentStatus.REJECTED;
      default:
        throw new Error(`Invalid payment status: ${value}`);
    }
  }

  getValue(): "PENDING" | "APPROVED" | "REJECTED" {
    return this.value;
  }

  isPending(): boolean {
    return this.value === "PENDING";
  }

  isApproved(): boolean {
    return this.value === "APPROVED";
  }

  isRejected(): boolean {
    return this.value === "REJECTED";
  }
}
