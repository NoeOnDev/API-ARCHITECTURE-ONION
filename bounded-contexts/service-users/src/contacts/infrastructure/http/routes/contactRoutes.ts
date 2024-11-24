import { Router } from "express";
import {
  saveContactController,
  findAllContactsController,
  findContactByIdController,
  findContactByEmailController,
  deleteContactByIdController,
  updateContactDetailsController,
} from "../../dependencyInjection";
import { validateRequest } from "../../../../_shared/infrastructure/middlewares/validationMiddleware";
import {
  saveContactSchema,
  updateContactDetailsSchema,
} from "../../validationSchemas";
import { jwtMiddleware } from "../../../../auth/infrastructure/dependencyInjection";

const contactRoutes = Router();

contactRoutes.post(
  "/contacts",
  validateRequest(saveContactSchema),
  saveContactController.handle.bind(saveContactController)
);
contactRoutes.get(
  "/contacts",
  findAllContactsController.handle.bind(findAllContactsController)
);
contactRoutes.get(
  "/contacts/id/:id",
  findContactByIdController.handle.bind(findContactByIdController)
);
contactRoutes.get(
  "/contacts/email/:email",
  findContactByEmailController.handle.bind(findContactByEmailController)
);
contactRoutes.delete(
  "/contacts/id/:id",
  deleteContactByIdController.handle.bind(deleteContactByIdController)
);

contactRoutes.put(
  "/contacts",
  jwtMiddleware.handle.bind(jwtMiddleware),
  validateRequest(updateContactDetailsSchema),
  updateContactDetailsController.handle.bind(updateContactDetailsController)
);

export default contactRoutes;
