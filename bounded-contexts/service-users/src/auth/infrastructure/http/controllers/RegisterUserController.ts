import { Request, Response } from "express";
import { RegisterUser } from "../../../application/RegisterUser";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

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
        res.status(error.statusCode).json({ error: error.message });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res
          .status(500)
          .json({ error: "Error saving contact", details: errorMessage });
      }
    }
  }
}
