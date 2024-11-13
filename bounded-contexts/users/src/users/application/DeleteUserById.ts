import { UserRepository } from "../domain/UserRepository";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class DeleteUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    await this.userRepository.deleteById(id);
  }
}
