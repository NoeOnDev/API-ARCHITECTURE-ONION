import { Request, Response } from "express";
import { FindUserById } from "../../../application/FindUserById";

export class FindUserByIdController {
  constructor(private findUserById: FindUserById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.findUserById.execute(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send("Error retrieving user");
    }
  }
}
