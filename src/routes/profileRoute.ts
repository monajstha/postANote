import { Router } from "express";
import {
  profileGet,
  userClubMemberStatusUpdate,
} from "@controllers/profileController";
import { isAuth } from "@middlewares/authMiddleware";

const profileRouter: Router = Router();

profileRouter.get("/", isAuth, profileGet);
profileRouter.put("/", isAuth, userClubMemberStatusUpdate);

export default profileRouter;
