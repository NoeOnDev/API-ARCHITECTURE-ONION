import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { EventMessageProvider } from "../../auth/domain/EventMessageProvider";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { EmailAlreadyInUseError } from "../../_shared/domain/errors/EmailAlreadyInUseError";

export class SaveContact {
  constructor(
    private contactRepository: ContactRepository,
    private messageProvider: EventMessageProvider,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<Contact> {
    const existingUserContact = await this.contactRepository.findByEmail(email);

    if (existingUserContact?.getStatus().getValue() === "USER") {
      throw new EmailAlreadyInUseError();
    }

    const contact = new Contact(firstName, lastName, email, phone);
    await this.contactRepository.save(contact);

    const eventType = EventType.CONTACT_SAVED;
    const message = this.messageProvider.getMessage(eventType);

    const event = new NotificationEvent(
      contact.getId(),
      "Contact",
      email,
      phone,
      message,
      "EMAIL",
      "NORMAL",
      eventType
    );

    await this.eventPublisher(event);
    return contact;
  }
}
