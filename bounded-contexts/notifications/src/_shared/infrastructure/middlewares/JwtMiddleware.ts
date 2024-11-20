import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../../tokens/domain/services/TokenService";

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
      .then((payload: any) => {
        req.body.userId = payload.id;
        req.body.eventType = payload.type;
        req.body.role = payload.role;
        next();
      })
      .catch(() => {
        res.status(401).json({ error: "Unauthorized" });
      });
  }
}
