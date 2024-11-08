import { Request, Response } from "express";
import { RegisterUser } from "../../../application/RegisterUser";

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { contactId, username, password } = req.body;
    try {
      await this.registerUser.execute(contactId, username, password);
      res.status(201).send("User created successfully");
    } catch (error) {
      res.status(500).send("Error saving user");
    }
  }
}
