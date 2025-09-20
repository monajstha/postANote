import { Router, Request, Response, NextFunction } from "express";
import {
  profileGet,
  userClubMemberStatusUpdate,
} from "@controllers/profileController";
import { isAuth } from "@middlewares/authMiddleware";
import { clubMemberValidation } from "@middlewares/validators/clubMemberValidator";
import { validationResult } from "express-validator";

const profileRouter: Router = Router();

profileRouter.get("/", isAuth, profileGet);
profileRouter.put("/", isAuth, userClubMemberStatusUpdate);
export default profileRouter;
