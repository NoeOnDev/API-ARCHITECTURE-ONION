import { TokenRepository } from "../domain/TokenRepository";
import { Token } from "../domain/Token";
import { TokenStatus } from "../domain/value-objects/TokenStatus";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";

export class GenerateTokenForUser {
  constructor(private tokenRepository: TokenRepository) {}

  async execute(userId: string, eventType: string): Promise<Token> {
    const identifier = Identifier.fromString(userId);
    const type = EventType.fromString(eventType);

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
      expiresAt,
      TokenStatus.PENDING,
      type
    );

    await this.tokenRepository.save(newToken);
    return newToken;
  }

  private generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }
}
