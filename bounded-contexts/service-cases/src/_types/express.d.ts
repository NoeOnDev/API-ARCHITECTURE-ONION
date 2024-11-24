import { JwtPayload } from "../_shared/domain/types/JwtPayload";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}
