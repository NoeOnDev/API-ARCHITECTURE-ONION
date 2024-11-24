import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class FindUserByUsername {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
