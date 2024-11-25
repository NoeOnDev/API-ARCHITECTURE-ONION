import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../../reports/domain/services/TokenService";
import { JwtPayload } from "../../domain/types/JwtPayload";

export class JwtMiddleware {
  constructor(private tokenService: TokenService) {}

  handle(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    this.tokenService
      .verifyToken(token)
      .then((payload) => {
        req.user = payload as JwtPayload;
        next();
      })
      .catch(() => {
        res.status(401).json({ error: "Unauthorized" });
      });
  }
}
