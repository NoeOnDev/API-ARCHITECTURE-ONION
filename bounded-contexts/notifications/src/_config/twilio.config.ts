import { Twilio } from "twilio";
import { env } from "./env.config";

export const twilioClient = new Twilio(
  env.twilio.TWILIO_ACCOUNT_SID,
  env.twilio.TWILIO_AUTH_TOKEN,
  { lazyLoading: true}
);
