import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { ContactCreatedEvent } from "../domain/events/ContactCreatedEvent";

export class SaveContact {
  constructor(
    private contactRepository: ContactRepository,
    private eventPublisher: (event: ContactCreatedEvent) => Promise<void>
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<Contact> {
    const contact = new Contact(firstName, lastName, email, phone);
    await this.contactRepository.save(contact);

    const event = new ContactCreatedEvent(
      contact.getId(),
      contact.getEmail(),
      contact.getPhone()
    );

    await this.eventPublisher(event);
    return contact;
  }
}
