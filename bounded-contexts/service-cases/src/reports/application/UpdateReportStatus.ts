import { ReportRepository } from "../domain/ReportRepository";
import { Report } from "../domain/Report";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { ReportStatus } from "../domain/value-objects/ReportStatus";
import { NoReportsFoundError } from "../../_shared/domain/errors/NoReportsFoundError";

export class UpdateReportStatus {
  constructor(private reportRepository: ReportRepository) {}

  async execute(reportId: string, status: string): Promise<Report> {
    const identifier = Identifier.fromString(reportId);
    const report = await this.reportRepository.findById(identifier);

    if (!report) {
      throw new NoReportsFoundError(reportId);
    }

    report.setStatus(ReportStatus.from(status));
    await this.reportRepository.save(report);

    return report;
  }
}
