import { Request, Response, NextFunction } from "express";

export const allMessagesGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("dashboard");
};
