import { InvalidReportStatusError } from "../../../_shared/domain/errors/InvalidReportStatusError";

export class ReportStatus {
  private readonly value: "PENDING" | "RESOLVED" | "UNRESOLVED";

  private constructor(value: "PENDING" | "RESOLVED" | "UNRESOLVED") {
    this.value = value;
  }

  static PENDING = new ReportStatus("PENDING");
  static RESOLVED = new ReportStatus("RESOLVED");
  static UNRESOLVED = new ReportStatus("UNRESOLVED");

  static from(value: string): ReportStatus {
    switch (value) {
      case "PENDING":
        return ReportStatus.PENDING;
      case "RESOLVED":
        return ReportStatus.RESOLVED;
      case "UNRESOLVED":
        return ReportStatus.UNRESOLVED;
      default:
        throw new InvalidReportStatusError(value);
    }
  }

  isPending(): boolean {
    return this.value === "PENDING";
  }

  isResolved(): boolean {
    return this.value === "RESOLVED";
  }

  isUnresolved(): boolean {
    return this.value === "UNRESOLVED";
  }

  getValue(): "PENDING" | "RESOLVED" | "UNRESOLVED" {
    return this.value;
  }
}
