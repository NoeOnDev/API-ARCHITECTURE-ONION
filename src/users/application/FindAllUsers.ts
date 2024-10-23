import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class FindAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
