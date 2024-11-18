import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/services/TokenService";
import { env } from "../../../_config/env.config";

export class JwtTokenService implements TokenService {
  private readonly secret: string;
  private readonly expiration: string;

  constructor() {
    this.secret = env.jwt.JWT_SECRET;
    this.expiration = env.jwt.JWT_EXPIRATION;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiration });
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
