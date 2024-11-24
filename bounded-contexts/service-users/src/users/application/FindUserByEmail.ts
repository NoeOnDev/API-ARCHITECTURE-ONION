import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
