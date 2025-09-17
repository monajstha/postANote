import { Request, Response, NextFunction } from "express";
import * as db from "@db/queries";
import { Result, QueryResult } from "pg";
import bcrypt from "bcrypt";

export const loginFormGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("log-in-form");
};

export const loginFormPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, username, password } = req.body;
};

export const signupFormGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("sign-up-form");
};

export const signupFormPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { first_name, last_name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const rowCount = await db.insertNewUser({
      first_name,
      last_name,
      username,
      password: hashedPassword,
    });
    if (rowCount) {
      res.status(201).redirect("/log-in");
    }
  } catch (error) {
    console.log("Error on signup form post: ", error);
  }
};
