import { InvalidReportCategoryError } from "../../../_shared/domain/errors/InvalidReportCategoryError";

export class ReportCategory {
  private readonly value: string;

  private static readonly validCategories = [
    "Light",
    "Water",
    "Infrastructure",
    "Trash",
  ];

  private constructor(value: string) {
    if (!ReportCategory.isValid(value)) {
      throw new InvalidReportCategoryError(value);
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    return this.validCategories.includes(value);
  }

  static fromString(value: string): ReportCategory {
    return new ReportCategory(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ReportCategory): boolean {
    return this.value === other.getValue();
  }
}
