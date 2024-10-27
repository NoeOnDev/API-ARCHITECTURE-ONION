import { UserRepository } from "../domain/UserRepository";

export class DeleteUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
