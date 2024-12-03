import { ReportRepository } from "../domain/ReportRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NoReportsFoundError } from "../../_shared/domain/errors/NoReportsFoundError";

export class UpdateReportDescription {
  constructor(private reportRepository: ReportRepository) {}

  async execute(reportId: string, newDescription: string): Promise<void> {
    const identifier = Identifier.fromString(reportId);
    const report = await this.reportRepository.findById(identifier);

    if (!report) {
      throw new NoReportsFoundError(reportId);
    }

    report.setDescription(newDescription.trim());
    await this.reportRepository.save(report);
  }
}
