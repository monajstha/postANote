import "express";
import { IUSer } from "@interface/user";

declare global {
  namespace Express {
    interface User extends IUSer {}
  }
}
