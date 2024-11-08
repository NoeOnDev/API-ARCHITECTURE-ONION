import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class FindUserByUsername {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
