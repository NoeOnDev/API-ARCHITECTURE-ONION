export class NotificationEvent {
  constructor(
    public readonly identifier: string,
    public readonly recipientType: "User" | "Contact",
    public readonly email: string,
    public readonly phone: string,
    public readonly message: string,
    public readonly channel: "EMAIL" | "WHATSAPP",
    public readonly type: "NORMAL" | "2FA"
  ) {}
}
