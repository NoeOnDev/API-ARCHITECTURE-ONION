import { UserRepository } from "../domain/UserRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class DeleteUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const identifier = Identifier.fromString(id);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }
    await this.userRepository.deleteById(identifier);
  }
}
