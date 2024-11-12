import { TokenRepository } from "../domain/TokenRepository";
import { UserVerifiedEvent } from "../domain/events/UserVerifiedEvent";
export class ValidateToken {
  constructor(
    private tokenRepository: TokenRepository,
    private eventPublisher: (event: UserVerifiedEvent) => Promise<void>
  ) {}

  async execute(
    userId: string,
    code: string,
    eventType: string
  ): Promise<boolean> {
    const token = await this.tokenRepository.findByCode(code);

    if (
      token &&
      token.getUserId() === userId &&
      token.isPending() &&
      !token.isExpired()
    ) {
      token.markAsUsed();
      await this.tokenRepository.save(token);

      if (eventType === "user_verification") {
        const event = new UserVerifiedEvent(userId);
        await this.eventPublisher(event);
      }

      return true;
    }

    return false;
  }
}
