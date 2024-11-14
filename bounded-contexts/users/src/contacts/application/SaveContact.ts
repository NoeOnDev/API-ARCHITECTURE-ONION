import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { EmailAlreadyInUseError } from "../../_shared/domain/errors/EmailAlreadyInUseError";

export class SaveContact {
  constructor(
    private contactRepository: ContactRepository,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<Contact> {
    const existingUserContact =
      await this.contactRepository.findByEmail(email);

    if (existingUserContact?.getStatus().getValue() === "USER") {
      throw new EmailAlreadyInUseError();
    }

    const contact = new Contact(firstName, lastName, email, phone);
    await this.contactRepository.save(contact);

    const message =
      "Welcome! Complete your registration to enjoy our services.";

    const event = new NotificationEvent(
      contact.getId(),
      "Contact",
      email,
      phone,
      message,
      "EMAIL",
      "NORMAL"
    );

    await this.eventPublisher(event);
    return contact;
  }
}
