export class VerificationCode {
    private readonly code: string;
    private readonly createdAt: Date;
    private readonly expiresAt: Date;
  
    private static readonly CODE_LENGTH = 5;
  
    constructor(code: string, createdAt?: Date, expiresInMinutes: number = 10) {
      this.validateCode(code);
      this.code = code;
      this.createdAt = createdAt || new Date();
      this.expiresAt = new Date(this.createdAt.getTime() + expiresInMinutes * 60000);
    }
  
    static generate(expiresInMinutes: number = 10): VerificationCode {
      const randomCode = Math.floor(Math.random() * Math.pow(10, VerificationCode.CODE_LENGTH))
        .toString()
        .padStart(VerificationCode.CODE_LENGTH, '0');
      return new VerificationCode(randomCode, new Date(), expiresInMinutes);
    }
  
    private validateCode(code: string): void {
      const regex = new RegExp(`^\\d{${VerificationCode.CODE_LENGTH}}$`);
      if (!regex.test(code)) {
        throw new Error(`Verification code must be exactly ${VerificationCode.CODE_LENGTH} digits.`);
      }
    }
  
    isExpired(): boolean {
      return new Date() > this.expiresAt;
    }
  
    matches(inputCode: string): boolean {
      return this.code === inputCode;
    }
  
    getCode(): string {
      return this.code;
    }
  
    getCreatedAt(): Date {
      return this.createdAt;
    }
  
    getExpiresAt(): Date {
      return this.expiresAt;
    }
  }
  