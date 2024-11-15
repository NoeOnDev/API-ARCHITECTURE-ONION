import { Request, Response } from "express";
import { RegisterUser } from "../../../application/RegisterUser";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { contactId, username, password } = req.body;
    try {
      const user = await this.registerUser.execute(
        contactId.trim(),
        username.trim(),
        password.trim()
      );
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.getId(),
          username: user.getUsername(),
          email: user.getContact().getEmail(),
          phone: user.getContact().getPhone(),
        },
      });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ message: "Registration failed" });
      }
    }
  }
}
