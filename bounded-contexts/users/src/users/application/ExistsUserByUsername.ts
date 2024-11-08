import { UserRepository } from "../domain/UserRepository";

export class ExistsUserByUsername {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string): Promise<boolean> {
    return this.userRepository.existsByUsername(username);
  }
}
