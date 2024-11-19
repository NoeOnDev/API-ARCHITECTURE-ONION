import { UserRepository } from "../../users/domain/UserRepository";
import { HashService } from "../domain/services/HashService";
import { TokenService } from "../domain/services/TokenService";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { EventMessageProvider } from "../domain/EventMessageProvider";
import { InvalidCredentialsError } from "../../_shared/domain/errors/InvalidCredentialsError";
import { AccountNotVerifiedError } from "../../_shared/domain/errors/AccountNotVerifiedError";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private tokenService: TokenService,
    private messageProvider: EventMessageProvider,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(identifier: string, password: string): Promise<string> {
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

    const eventType = EventType.USER_AUTHENTICATION;
    const payload = {
      id: user.getId().getValue(),
      type: eventType.getValue(),
    };

    const token = this.tokenService.generateTempToken(payload);

    const message = this.messageProvider.getMessage(eventType);
    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "WHATSAPP",
      "2FA",
      eventType
    );

    await this.eventPublisher(event);

    return token;
  }
}
