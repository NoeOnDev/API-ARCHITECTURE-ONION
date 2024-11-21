import { JwtPayload } from "../auth/domain/JwtPayload";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}
