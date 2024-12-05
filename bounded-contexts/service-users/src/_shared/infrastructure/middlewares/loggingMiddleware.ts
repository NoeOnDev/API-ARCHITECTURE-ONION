import { Request, Response, NextFunction } from "express";
import logger from "../../../_config/logger";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    logger.info(`${method} ${url} ${statusCode} - ${duration}ms`);
  });

  res.on("close", () => {
    if (res.statusCode >= 400) {
      const duration = Date.now() - start;
      logger.error(`${method} ${url} ${res.statusCode} - ${duration}ms`);
    }
  });

  next();
};
