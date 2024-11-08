import { Payment } from "./Payment";

export interface PaymentRepository {
  save(payment: Payment): Promise<void>;
  findById(id: string): Promise<Payment | null>;
  update(payment: Payment): Promise<void>;
}
