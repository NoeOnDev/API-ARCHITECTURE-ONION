import { InvalidTextProcessingStatusError } from "../errors/InvalidTextProcessingStatusError";

export class TextProcessingStatus {
  private readonly value: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

  private constructor(
    value: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED"
  ) {
    this.value = value;
  }

  static PENDING = new TextProcessingStatus("PENDING");
  static IN_PROGRESS = new TextProcessingStatus("IN_PROGRESS");
  static COMPLETED = new TextProcessingStatus("COMPLETED");
  static FAILED = new TextProcessingStatus("FAILED");

  static from(value: string): TextProcessingStatus {
    switch (value) {
      case "PENDING":
        return TextProcessingStatus.PENDING;
      case "IN_PROGRESS":
        return TextProcessingStatus.IN_PROGRESS;
      case "COMPLETED":
        return TextProcessingStatus.COMPLETED;
      case "FAILED":
        return TextProcessingStatus.FAILED;
      default:
        throw new InvalidTextProcessingStatusError(value);
    }
  }

  getValue(): string {
    return this.value;
  }

  isPending(): boolean {
    return this.value === "PENDING";
  }

  isInProgress(): boolean {
    return this.value === "IN_PROGRESS";
  }

  isCompleted(): boolean {
    return this.value === "COMPLETED";
  }

  isFailed(): boolean {
    return this.value === "FAILED";
  }
}
