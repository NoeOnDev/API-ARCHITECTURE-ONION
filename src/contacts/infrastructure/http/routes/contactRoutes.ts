import { Router } from "express";
import {
  saveContactController,
  findAllContactsController,
  findContactByIdController,
  findContactByEmailController,
  deleteContactByIdController,
} from "../../dependencyInjection";

const router = Router();

router.post(
  "/contacts",
  saveContactController.handle.bind(saveContactController)
);
router.get(
  "/contacts",
  findAllContactsController.handle.bind(findAllContactsController)
);
router.get(
  "/contacts/:id",
  findContactByIdController.handle.bind(findContactByIdController)
);
router.get(
  "/contacts/email/:email",
  findContactByEmailController.handle.bind(findContactByEmailController)
);
router.delete(
  "/contacts/:id",
  deleteContactByIdController.handle.bind(deleteContactByIdController)
);

export default router;
