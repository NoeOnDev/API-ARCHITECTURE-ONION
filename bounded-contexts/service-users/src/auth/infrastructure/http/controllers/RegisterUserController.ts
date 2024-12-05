import { Request, Response } from "express";
import { RegisterUser } from "../../../application/RegisterUser";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";
import logger from "../../../../_config/logger";

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { contactId, username, password, role, locality, street } = req.body;
    try {
      const token = await this.registerUser.execute(
        contactId.trim(),
        username.trim(),
        password.trim(),
        role.trim(),
        locality.trim(),
        street.trim()
      );
      res.status(201).json({ token });
    } catch (error) {
      if (error instanceof DomainError) {
        logger.error(`Error: ${error.message}`);
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        logger.error(`Error: ${errorMessage}`);
        res
          .status(500)
          .json({ error: "Error saving contact", details: errorMessage });
      }
    }
  }
}