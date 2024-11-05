import { TokenRepository } from "../domain/TokenRepository";
import { Token } from "../domain/Token";
import { TokenStatus } from "../domain/value-objects/TokenStatus";

export class GenerateTokenForUser {
  constructor(private tokenRepository: TokenRepository) {}

  async execute(userId: string): Promise<Token> {
    const activeToken = await this.tokenRepository.findByUserId(userId);
    if (activeToken && activeToken.isPending() && !activeToken.isExpired()) {
      activeToken.expire();
      await this.tokenRepository.save(activeToken);
    }

    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const newToken = new Token(
      userId,
      code,
      new Date(),
      expiresAt,
      TokenStatus.PENDING
    );

    await this.tokenRepository.save(newToken);
    return newToken;
  }

  private generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }
}
