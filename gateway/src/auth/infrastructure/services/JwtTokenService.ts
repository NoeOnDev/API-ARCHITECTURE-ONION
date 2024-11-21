import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/services/TokenService";
import { env } from "../../../_config/env.config";

export class JwtTokenService implements TokenService {
  private readonly secret: string;

  constructor() {
    this.secret = env.jwt.JWT_SECRET;
  }

  verifyToken(token: string): Promise<object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as object);
        }
      });
    });
  }
}
