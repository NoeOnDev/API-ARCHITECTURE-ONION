import { Request, Response } from "express";
import { LoginUser } from "../../../application/LoginUser";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";

export class LoginUserController {
  constructor(private loginUser: LoginUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { identifier, password } = req.body;
    try {
      const user = await this.loginUser.execute(identifier, password);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ message: "Login failed" });
      }
    }
  }
}
