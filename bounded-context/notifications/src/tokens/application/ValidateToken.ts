import { TokenRepository } from "../domain/TokenRepository";

export class ValidateToken {
  constructor(private tokenRepository: TokenRepository) {}

  async execute(userId: string, code: string): Promise<boolean> {
    const token = await this.tokenRepository.findByCode(code);

    if (
      token &&
      token.getUserId() === userId &&
      token.isPending() &&
      !token.isExpired()
    ) {
      token.markAsUsed();
      await this.tokenRepository.save(token);
      return true;
    }

    return false;
  }
}
