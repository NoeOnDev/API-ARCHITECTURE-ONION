import { ReportRepository } from "../domain/ReportRepository";
import { Report } from "../domain/Report";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NoReportsFoundError } from "../../_shared/domain/errors/NoReportsFoundError";

export class FindReportsByUserId {
  constructor(private reportRepository: ReportRepository) {}

  async execute(userId: string): Promise<Report[]> {
    const identifier = Identifier.fromString(userId);
    const reports = await this.reportRepository.findByUserId(identifier);

    if (reports.length === 0) {
      throw new NoReportsFoundError(userId);
    }

    return reports;
  }
}
