import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
