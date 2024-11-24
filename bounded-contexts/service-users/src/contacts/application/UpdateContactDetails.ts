import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../domain/ContactRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { ContactHobby } from "../domain/value-objects/ContactHobbit";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";
import { Contact } from "../domain/Contact";

export class UpdateContactDetails {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly contactRepository: ContactRepository
  ) {}

  async execute(
    userId: string,
    firstName: string,
    lastName: string,
    hobby: string
  ): Promise<void> {
    const userIdentifier = Identifier.fromString(userId);

    const user = await this.userRepository.findById(userIdentifier);
    if (!user) {
      throw new UserNotFoundError();
    }

    const contactIdentifier = user.getContact().getId();
    const contact = await this.contactRepository.findById(contactIdentifier);

    if (!contact) {
      throw new ContactNotFoundError();
    }

    const updatedContact = new Contact(
      firstName || contact.getFirstName(),
      lastName || contact.getLastName(),
      contact.getEmail(),
      contact.getPhone(),
      hobby ? ContactHobby.fromString(hobby) : contact.getHobby(),
      contact.getStatus(),
      contact.getId()
    );

    await this.contactRepository.save(updatedContact);
  }
}
