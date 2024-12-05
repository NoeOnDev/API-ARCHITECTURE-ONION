import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";

const { combine, printf } = format;

const logFormat = printf(({ level, message }) => {
  const timestamp = moment()
    .tz("America/Mexico_City")
    .format("YYYY-MM-DD HH:mm:ss");
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/api.log" }),
  ],
});

export default logger;
