import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class FindUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const identifier = Identifier.fromString(id);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
