import { NotificationMessageProvider } from "../../domain/NotificationMessageProvider";
import { NotificationType } from "../../domain/NotificationType";
import { InvalidNotificationTypeError } from "../../../_shared/domain/errors/InvalidNotificationTypeError";

export class InMemoryNotificationMessageProvider
  implements NotificationMessageProvider
{
  private messages: Record<NotificationType, string> = {
    [NotificationType.USER_VERIFICATION]:
      "Welcome! Here is your verification code to activate your account.",
    [NotificationType.USER_PASSWORD_CHANGE]:
      "We have received your password change request. You will receive a verification code shortly to proceed with the password change process. Please follow the instructions to securely update your password.",
  };

  getMessage(notificationType: NotificationType): string {
    const message = this.messages[notificationType];
    if (!message) {
      throw new InvalidNotificationTypeError(notificationType);
    }
    return message;
  }
}
