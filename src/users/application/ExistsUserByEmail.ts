import { UserRepository } from "../domain/UserRepository";

export class ExistsUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }
}
