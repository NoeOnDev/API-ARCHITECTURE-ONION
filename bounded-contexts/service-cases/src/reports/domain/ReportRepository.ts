import { Report } from "./Report";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface ReportRepository {
  save(report: Report): Promise<void>;
  findById(id: Identifier): Promise<Report | null>;
  findByUserId(userId: Identifier): Promise<Report[]>;
  findByLocality(locality: string): Promise<Report[]>;
  deleteById(id: Identifier): Promise<void>;
}
