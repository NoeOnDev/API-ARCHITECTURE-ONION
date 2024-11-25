import { ReportRepository } from "../domain/ReportRepository";
import { Report } from "../domain/Report";
import { NoReportsFoundError } from "../../_shared/domain/errors/NoReportsFoundError";

export class FindReportsByLocality {
  constructor(private reportRepository: ReportRepository) {}

  async execute(locality: string): Promise<Report[]> {
    const reports = await this.reportRepository.findByLocality(locality);

    if (reports.length === 0) {
      throw new NoReportsFoundError(locality);
    }

    return reports;
  }
}
