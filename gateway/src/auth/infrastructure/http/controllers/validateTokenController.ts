import { Request, Response } from "express";

export const validateTokenController = (req: Request, res: Response) => {
  const { id, type, role } = req.user;
  res.status(200).json({ message: "Token is valid", id, type, role });
};
