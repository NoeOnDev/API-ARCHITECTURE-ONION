import { SendNotification } from "../application/SendNotification";

import { MongoNotificationRepository } from "./persistence/MongoNotificationRepository";

import { MultiChannelNotificationService } from "./services/MultiChannelNotificationService";
import { TwilioNotificationService } from "./services/TwilioNotificationService";
import { EmailNotificationService } from "./services/EmailNotificationService";

const notificationRepository = new MongoNotificationRepository();

const whatsappService = new TwilioNotificationService();
const emailService = new EmailNotificationService();
const notificationService = new MultiChannelNotificationService(
  whatsappService,
  emailService
);

const sendNotification = new SendNotification(
  notificationRepository,
  notificationService
);

export { sendNotification };
