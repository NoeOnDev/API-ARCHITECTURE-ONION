import { Request, Response } from "express";
import { LoginUser } from "../../../application/LoginUser";
import { DomainError } from "../../../../_shared/domain/errors/DomainError";
import logger from "../../../../_config/logger";

export class LoginUserController {
  constructor(private loginUser: LoginUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { identifier, password } = req.body;
    try {
      const token = await this.loginUser.execute(
        identifier.trim(),
        password.trim()
      );
      res.status(200).json({ token });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error(
        `Error: ${errorMessage}, Identifier: ${identifier}, Password: ${password}`
      );
      if (error instanceof DomainError) {
        res
          .status(error.statusCode)
          .json({ error: error.message, identifier, password });
      } else {
        res
          .status(500)
          .json({
            error: "Login failed",
            details: errorMessage,
            identifier,
            password,
          });
      }
    }
  }
}
