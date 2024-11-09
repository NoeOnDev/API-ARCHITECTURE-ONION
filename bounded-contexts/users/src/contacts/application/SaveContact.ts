import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { NotificationEvent } from "../../shared/domain/events/NotificationEvent";

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
