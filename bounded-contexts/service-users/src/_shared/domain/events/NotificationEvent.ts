import { Identifier } from "../value-objects/Identifier";
import { EventType } from "../value-objects/EventType";

export class NotificationEvent {
  constructor(
    public readonly identifier: Identifier,
    public readonly recipientType: "User" | "Contact",
    public readonly email: string,
    public readonly phone: string,
    public readonly message: string,
    public readonly channel: "EMAIL" | "WHATSAPP",
    public readonly type: "NORMAL" | "2FA",
    public readonly eventType: EventType
  ) {}
}
