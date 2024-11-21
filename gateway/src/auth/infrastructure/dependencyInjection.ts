import { JwtTokenService } from "./services/JwtTokenService";
import { JwtMiddleware } from "./middlewares/JwtMiddleware";

const jwtTokenService = new JwtTokenService();
const jwtMiddleware = new JwtMiddleware(jwtTokenService);

export { jwtMiddleware };
