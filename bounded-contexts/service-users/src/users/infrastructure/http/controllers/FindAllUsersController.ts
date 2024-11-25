import { Request, Response } from "express";
import { FindAllUsers } from "../../../application/FindAllUsers";

export class FindAllUsersController {
  constructor(private findAllUsers: FindAllUsers) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.findAllUsers.execute();
      res.json(users);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res
        .status(500)
        .json({ error: "Error retrieving users", details: errorMessage });
    }
  }
}
