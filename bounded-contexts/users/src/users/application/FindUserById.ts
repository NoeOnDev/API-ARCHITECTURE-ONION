import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class FindUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
