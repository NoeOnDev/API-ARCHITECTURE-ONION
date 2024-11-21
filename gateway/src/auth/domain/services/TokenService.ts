export interface TokenService {
  verifyToken(token: string): Promise<object>;
}
