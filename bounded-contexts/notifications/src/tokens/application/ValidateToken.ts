import { TokenRepository } from "../domain/TokenRepository";
import { UserVerifiedEvent } from "../domain/events/UserVerifiedEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { TokenNotFoundError } from "../../_shared/domain/errors/TokenNotFoundError";
import { InvalidTokenUserError } from "../../_shared/domain/errors/InvalidTokenUserError";
import { TokenExpiredError } from "../../_shared/domain/errors/TokenExpiredError";
import { TokenAlreadyUsedError } from "../../_shared/domain/errors/TokenAlreadyUsedError";
import { InvalidEventTypeError } from "../../_shared/domain/errors/InvalidEventTypeError";

export class ValidateToken {
  constructor(
    private tokenRepository: TokenRepository,
    private eventPublisher: (event: UserVerifiedEvent) => Promise<void>
  ) {}

  async execute(
    userId: string,
    code: string,
    eventType: string
  ): Promise<{ isValid: boolean; userId?: string }> {
    const identifier = Identifier.fromString(userId);
    const token = await this.tokenRepository.findByCode(code);

    if (!token) {
      throw new TokenNotFoundError();
    }

    if (token.isExpired()) {
      throw new TokenExpiredError();
    }

    if (!token.isPending()) {
      throw new TokenAlreadyUsedError();
    }

    if (!token.getUserId().equals(identifier)) {
      throw new InvalidTokenUserError();
    }

    const type = EventType.fromString(eventType);

    if (!token.getEventType().equals(type)) {
      throw new InvalidEventTypeError(eventType);
    }

    token.markAsUsed();
    await this.tokenRepository.save(token);

    if (type.equals(EventType.USER_VERIFICATION)) {
      const event = new UserVerifiedEvent(identifier);
      await this.eventPublisher(event);
    }

    return { isValid: true, userId: token.getUserId().getValue() };
  }
}
