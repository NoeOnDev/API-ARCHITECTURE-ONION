import { UserRepository } from "../../users/domain/UserRepository";
import { HashService } from "../domain/services/HashService";
import { User } from "../../users/domain/User";
import { InvalidCredentialsError } from "../../_shared/domain/errors/InvalidCredentialsError";
import { AccountNotVerifiedError } from "../../_shared/domain/errors/AccountNotVerifiedError";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  async execute(identifier: string, password: string): Promise<User> {
    let user = await this.userRepository.findByUsername(identifier);
    if (!user) {
      user = await this.userRepository.findByEmail(identifier);
    }

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.isVerified()) {
      throw new AccountNotVerifiedError();
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.getPassword()
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
