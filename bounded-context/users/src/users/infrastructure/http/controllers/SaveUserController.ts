import { Request, Response } from "express";
import { SaveUser } from "../../../application/SaveUser";

export class SaveUserController {
  constructor(private saveUser: SaveUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { contactId, username, password } = req.body;
    try {
      await this.saveUser.execute(contactId, username, password);
      res.status(201).send("User created successfully");
    } catch (error) {
      res.status(500).send("Error saving user");
    }
  }
}
