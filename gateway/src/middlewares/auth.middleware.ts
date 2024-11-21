import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../_config/env.config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  jwt.verify(token, env.jwt.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    (req as any).user = decoded;
    next();
  });
};
