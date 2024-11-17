import { TokenRepository } from "../domain/TokenRepository";
import { Token } from "../domain/Token";
import { TokenStatus } from "../domain/value-objects/TokenStatus";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class GenerateTokenForUser {
  constructor(private tokenRepository: TokenRepository) {}

  async execute(userId: string): Promise<Token> {
    const identifier = Identifier.fromString(userId);
    const activeToken = await this.tokenRepository.findByUserId(identifier);
    if (activeToken && activeToken.isPending()) {
      activeToken.expire();
      await this.tokenRepository.save(activeToken);
    }

    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const newToken = new Token(
      identifier,
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
