export interface TokenService {
  generateAuthToken(payload: object): string;
  generateTempToken(payload: object): string;
  verifyToken(token: string): Promise<object>;
}
