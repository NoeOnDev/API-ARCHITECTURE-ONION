import { TokenRepository } from "../domain/TokenRepository";
import { UserVerifiedEvent } from "../domain/events/UserVerifiedEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { TokenService } from "../domain/services/TokenService";
import { TokenNotFoundError } from "../../_shared/domain/errors/TokenNotFoundError";
import { InvalidTokenUserError } from "../../_shared/domain/errors/InvalidTokenUserError";
import { TokenExpiredError } from "../../_shared/domain/errors/TokenExpiredError";
import { TokenAlreadyUsedError } from "../../_shared/domain/errors/TokenAlreadyUsedError";
import { InvalidEventTypeError } from "../../_shared/domain/errors/InvalidEventTypeError";

export class ValidateToken {
  constructor(
    private tokenRepository: TokenRepository,
    private tokenService: TokenService,
    private eventPublisher: (event: UserVerifiedEvent) => Promise<void>
  ) {}

  async execute(
    userId: string,
    code: string,
    eventType: string,
    role: string,
    locality: string,
    firstName: string,
    email: string,
    phone: string
  ): Promise<{ isValid: boolean; jwtToken?: string; role: string }> {
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

    let jwtToken: string | undefined;
    const payload = {
      id: userId,
      type: type.equals(EventType.USER_PASSWORD_CHANGE)
        ? EventType.USER_PASSWORD_UPDATED.getValue()
        : type.getValue(),
      role,
      locality,
      firstName,
      email,
      phone,
    };

    if (type.equals(EventType.USER_VERIFICATION)) {
      const event = new UserVerifiedEvent(identifier);
      await this.eventPublisher(event);
    } else if (type.equals(EventType.USER_AUTHENTICATION)) {
      jwtToken = this.tokenService.generateAuthToken(payload);
    } else if (type.equals(EventType.USER_PASSWORD_CHANGE)) {
      jwtToken = this.tokenService.generateTempToken(payload);
    }

    return { isValid: true, jwtToken, role };
  }
}
