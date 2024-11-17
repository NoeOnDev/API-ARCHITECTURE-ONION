import { EventMessageProvider } from "../../domain/EventMessageProvider";
import { EventType } from "../../../_shared/domain/value-objects/EventType";
import { InvalidEventTypeError } from "../../../_shared/domain/errors/InvalidEventTypeError";

export class MemoryEventMessageProvider implements EventMessageProvider {
  private messages: Record<string, string> = {
    [EventType.USER_VERIFICATION.getValue()]:
      "Welcome! Here is your verification code to activate your account.",
    [EventType.USER_PASSWORD_CHANGE.getValue()]:
      "We have received your password change request. You will receive a verification code shortly to proceed with the password change process. Please follow the instructions to securely update your password.",
    [EventType.USER_AUTHENTICATION.getValue()]:
      "You have successfully logged in to your account.",
  };

  getMessage(eventType: EventType): string {
    const message = this.messages[eventType.getValue()];
    if (!message) {
      throw new InvalidEventTypeError(eventType.getValue());
    }
    return message;
  }
}
