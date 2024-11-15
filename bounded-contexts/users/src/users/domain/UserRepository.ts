import { User } from "./User";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface UserRepository {
  save(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: Identifier): Promise<User | null>;
  deleteById(id: Identifier): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
