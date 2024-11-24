import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { User } from "../../users/domain/User";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { UserRole } from "../../users/domain/value-objects/UserRole";
import { HashService } from "../domain/services/HashService";
import { TokenService } from "../domain/services/TokenService";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { EventMessageProvider } from "../domain/EventMessageProvider";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";
import { ContactAlreadyRegisteredError } from "../../_shared/domain/errors/ContactAlreadyRegisteredError";
import { UsernameAlreadyExistsError } from "../../_shared/domain/errors/UsernameAlreadyExistsError";

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private contactRepository: ContactRepository,
    private hashService: HashService,
    private tokenService: TokenService,
    private messageProvider: EventMessageProvider,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    contactId: string,
    username: string,
    password: string,
    role: string
  ): Promise<string> {
    const identifier = Identifier.fromString(contactId);
    const contact = await this.contactRepository.findById(identifier);

    if (!contact) {
      throw new ContactNotFoundError();
    }

    if (contact.getStatus().getValue() !== "LEAD") {
      throw new ContactAlreadyRegisteredError();
    }

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new UsernameAlreadyExistsError();
    }

    const hashedPassword = await this.hashService.hash(password);
    const userRole = UserRole.fromValue(role);

    const user = new User(username, hashedPassword, contact, userRole);
    await this.userRepository.save(user);

    const eventType = EventType.USER_VERIFICATION;
    const payload = {
      id: user.getId().getValue(),
      type: eventType.getValue(),
      role: userRole.getValue(),
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
