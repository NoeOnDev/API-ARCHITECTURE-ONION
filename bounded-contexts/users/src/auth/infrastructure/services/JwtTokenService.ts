import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/services/TokenService";
import { env } from "../../../_config/env.config";

export class JwtTokenService implements TokenService {
  private readonly secret: string;

  constructor() {
    this.secret = env.jwt.JWT_SECRET;
  }

  generateAuthToken(payload: object): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: env.jwt.JWT_EXPIRATION,
    });
  }

  generateTempToken(payload: object): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: env.jwt.JWT_EXPIRATION_TEMP,
    });
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
