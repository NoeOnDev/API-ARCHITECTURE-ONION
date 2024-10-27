import argon2 from "argon2";
import { HashService } from "../../domain/HashService";

export class Argon2HashService implements HashService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
