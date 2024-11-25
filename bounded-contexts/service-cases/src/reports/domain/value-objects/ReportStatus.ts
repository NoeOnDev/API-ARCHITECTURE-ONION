export class ReportStatus {
  private readonly value: "pending" | "resolved" | "unresolved";

  private constructor(value: "pending" | "resolved" | "unresolved") {
    this.value = value;
  }

  static PENDING = new ReportStatus("pending");
  static RESOLVED = new ReportStatus("resolved");
  static UNRESOLVED = new ReportStatus("unresolved");

  static from(value: string): ReportStatus {
    switch (value) {
      case "pending":
        return ReportStatus.PENDING;
      case "resolved":
        return ReportStatus.RESOLVED;
      case "unresolved":
        return ReportStatus.UNRESOLVED;
      default:
        throw new Error(`Invalid report status: ${value}`);
    }
  }

  isPending(): boolean {
    return this.value === "pending";
  }

  isResolved(): boolean {
    return this.value === "resolved";
  }

  isUnresolved(): boolean {
    return this.value === "unresolved";
  }

  getValue(): "pending" | "resolved" | "unresolved" {
    return this.value;
  }
}
