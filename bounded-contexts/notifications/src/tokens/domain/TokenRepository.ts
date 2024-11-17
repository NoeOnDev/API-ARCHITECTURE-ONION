import { Token } from "./Token";
import { TokenStatus } from "./value-objects/TokenStatus";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface TokenRepository {
  save(token: Token): Promise<void>;
  findByUserId(userId: Identifier): Promise<Token | null>;
  findByCode(code: string): Promise<Token | null>;
  updateStatus(tokenId: Identifier, status: TokenStatus): Promise<void>;
}
