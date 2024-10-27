import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class FindUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
