import { pool } from "../../_config/db.config";

import { SaveContact } from "../application/SaveContact";
import { FindAllContacts } from "../application/FindAllContacts";
import { FindContactById } from "../application/FindContactById";
import { FindContactByEmail } from "../application/FindContactByEmail";
import { DeleteContactById } from "../application/DeleteContactById";

import { SaveContactController } from "./http/controllers/saveContactController";
import { FindAllContactsController } from "./http/controllers/findAllContactsController";
import { FindContactByIdController } from "./http/controllers/findContactByIdController";
import { FindContactByEmailController } from "./http/controllers/findContactByEmailController";
import { DeleteContactByIdController } from "./http/controllers/deleteContactByIdController";

import { PostgresContactRepository } from "./PostgresContactRepository";

import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

const contactRepository = new PostgresContactRepository(pool);

const findContactById = new FindContactById(contactRepository);
const findContactByEmail = new FindContactByEmail(contactRepository);
const deleteContactById = new DeleteContactById(contactRepository);
const saveContact = new SaveContact(contactRepository, rabbitmqEventPublisher);
const findAllContacts = new FindAllContacts(contactRepository);

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

export {
  contactRepository,
  saveContactController,
  findAllContactsController,
  findContactByIdController,
  findContactByEmailController,
  deleteContactByIdController,
};
