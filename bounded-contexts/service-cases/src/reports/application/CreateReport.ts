import { ReportRepository } from "../domain/ReportRepository";
import { Report } from "../domain/Report";
import { ReportAddress } from "../domain/value-objects/ReportAddress";
import { ReportCategory } from "../domain/value-objects/ReportCategory";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { InvalidReportCategoryError } from "../../_shared/domain/errors/InvalidReportCategoryError";

export class CreateReport {
  constructor(private reportRepository: ReportRepository) {}

  async execute(
    userId: string,
    title: string,
    category: string,
    description: string,
    locality: string,
    street: string,
    createdAt: Date
  ): Promise<Report> {
    const identifier = Identifier.fromString(userId);

    if (!ReportCategory.isValid(category)) {
      throw new InvalidReportCategoryError(category);
    }

    const report = new Report(
      title,
      ReportCategory.fromString(category),
      description,
      new ReportAddress(locality, street),
      identifier,
      createdAt
    );

    await this.reportRepository.save(report);
    return report;
  }
}
