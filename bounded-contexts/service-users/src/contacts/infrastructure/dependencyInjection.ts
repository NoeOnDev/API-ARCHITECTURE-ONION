import { pool } from "../../_config/db.config";

import { SaveContact } from "../application/SaveContact";
import { FindAllContacts } from "../application/FindAllContacts";
import { FindContactById } from "../application/FindContactById";
import { FindContactByEmail } from "../application/FindContactByEmail";
import { DeleteContactById } from "../application/DeleteContactById";
import { UpdateContactDetails } from "../application/UpdateContactDetails";

import { SaveContactController } from "./http/controllers/saveContactController";
import { FindAllContactsController } from "./http/controllers/findAllContactsController";
import { FindContactByIdController } from "./http/controllers/findContactByIdController";
import { FindContactByEmailController } from "./http/controllers/findContactByEmailController";
import { DeleteContactByIdController } from "./http/controllers/deleteContactByIdController";
import { UpdateContactDetailsController } from "./http/controllers/UpdateContactDetailsController";

import { PostgresContactRepository } from "./persistence/PostgresContactRepository";

import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

import { MemoryEventMessageProvider } from "../../auth/infrastructure/persistence/MemoryEventMessageProvider";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

const messageProvider = new MemoryEventMessageProvider();

const contactRepository = new PostgresContactRepository(pool);

const findContactById = new FindContactById(contactRepository);
const findContactByEmail = new FindContactByEmail(contactRepository);
const deleteContactById = new DeleteContactById(contactRepository);
const saveContact = new SaveContact(
  contactRepository,
  messageProvider,
  rabbitmqEventPublisher
);
const findAllContacts = new FindAllContacts(contactRepository);
const updateContactDetails = new UpdateContactDetails(
  userRepository,
  contactRepository
);

const saveContactController = new SaveContactController(saveContact);
const findAllContactsController = new FindAllContactsController(
  findAllContacts
);
const findContactByIdController = new FindContactByIdController(
  findContactById
);
const findContactByEmailController = new FindContactByEmailController(
  findContactByEmail
);
const deleteContactByIdController = new DeleteContactByIdController(
  deleteContactById
);
const updateContactDetailsController = new UpdateContactDetailsController(
  updateContactDetails
);

export {
  contactRepository,
  saveContactController,
  findAllContactsController,
  findContactByIdController,
  findContactByEmailController,
  deleteContactByIdController,
  updateContactDetailsController,
};
