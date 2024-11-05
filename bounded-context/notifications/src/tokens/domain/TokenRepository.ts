import { Token } from "./Token";
import { TokenStatus } from "./value-objects/TokenStatus";

export interface TokenRepository {
  save(token: Token): Promise<void>;
  findByUserId(userId: string): Promise<Token | null>;
  findByCode(code: string): Promise<Token | null>;
  updateStatus(tokenId: string, status: TokenStatus): Promise<void>;
}
