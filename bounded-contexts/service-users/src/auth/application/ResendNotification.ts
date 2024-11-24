import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { EventMessageProvider } from "../domain/EventMessageProvider";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class ResendNotification {
  constructor(
    private userRepository: UserRepository,
    private messageProvider: EventMessageProvider,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string, eventTypeString: string): Promise<void> {
    const identifier = Identifier.fromString(userId);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }

    const eventType = EventType.fromString(eventTypeString);
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
  }
}
