import { Donation } from "./Donation";

export interface DonationRepository {
  save(donation: Donation): Promise<void>;
  findById(id: string): Promise<Donation | null>;
  update(donation: Donation): Promise<void>;
}
