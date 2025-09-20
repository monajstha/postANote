import { Request, Response, NextFunction } from "express";
import {
  allPostsGet,
  newPostFormGet,
  newPostFormPost,
} from "@controllers/postsController";
import { isAuth } from "@middlewares/authMiddleware";
import { postValidation } from "@middlewares/validators/postValidator";
import { Router } from "express";
import { validationResult } from "express-validator";

const postsRoute = Router();

postsRoute.get("/", isAuth, allPostsGet);
postsRoute.get("/new", isAuth, newPostFormGet);
postsRoute.post(
  "/new",
  isAuth,
  postValidation,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new-post-form", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
    next();
  },
  newPostFormPost
);

export default postsRoute;
