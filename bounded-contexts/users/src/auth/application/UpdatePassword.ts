import { UserRepository } from "../../users/domain/UserRepository";
import { HashService } from "../domain/services/HashService";

export class UpdatePassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) {}

  async execute(userId: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isVerified()) {
      throw new Error("User not verified");
    }

    const hashedPassword = await this.hashService.hash(newPassword);
    user.updatePassword(hashedPassword);
    await this.userRepository.save(user);
  }
}
