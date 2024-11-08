export class DonationStatus {
  private readonly value: "PENDING" | "COMPLETED" | "FAILED";

  private constructor(value: "PENDING" | "COMPLETED" | "FAILED") {
    this.value = value;
  }

  static PENDING = new DonationStatus("PENDING");
  static COMPLETED = new DonationStatus("COMPLETED");
  static FAILED = new DonationStatus("FAILED");

  static from(value: string): DonationStatus {
    switch (value) {
      case "PENDING":
        return DonationStatus.PENDING;
      case "COMPLETED":
        return DonationStatus.COMPLETED;
      case "FAILED":
        return DonationStatus.FAILED;
      default:
        throw new Error(`Invalid donation status: ${value}`);
    }
  }

  getValue(): "PENDING" | "COMPLETED" | "FAILED" {
    return this.value;
  }

  isPending(): boolean {
    return this.value === "PENDING";
  }

  isCompleted(): boolean {
    return this.value === "COMPLETED";
  }

  isFailed(): boolean {
    return this.value === "FAILED";
  }
}
