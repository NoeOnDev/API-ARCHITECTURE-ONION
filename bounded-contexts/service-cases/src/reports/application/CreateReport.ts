import { ReportRepository } from "../domain/ReportRepository";
import { Report } from "../domain/Report";
import { ReportAddress } from "../domain/value-objects/ReportAddress";
import { ReportCategory } from "../domain/value-objects/ReportCategory";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { TextMiningEvent } from "../../_shared/domain/events/TextMiningEvent";
import { InvalidReportCategoryError } from "../../_shared/domain/errors/InvalidReportCategoryError";

export class CreateReport {
  constructor(
    private reportRepository: ReportRepository,
    private eventPublisher: (event: TextMiningEvent) => Promise<void>
  ) {}

  async execute(
    userId: string,
    title: string,
    category: string,
    description: string,
    locality: string,
    street: string,
    userLocality: string,
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
      userLocality,
      createdAt
    );

    await this.reportRepository.save(report);

    const textMiningEvent = new TextMiningEvent(
      report.getId(),
      "Report",
      report.getTitle(),
      report.getDescription()
    );

    await this.eventPublisher(textMiningEvent);

    return report;
  }
}
