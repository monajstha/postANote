import { Router, Request, Response, NextFunction } from "express";
import {
  loginFormGet,
  loginFormPost,
  signupFormGet,
  signupFormPost,
} from "@controllers/authController";
import passport from "passport";
import { allPostsGet } from "@controllers/postsController";
import { isAuth } from "@middlewares/authMiddleware";
import { signupValidation } from "@middlewares/validators/signupValidator";
import { validationResult } from "express-validator";
import { loginValidation } from "@middlewares/validators/loginValidator";

const authRouter: Router = Router();

authRouter.get("/", isAuth, allPostsGet);
authRouter.get("/log-in", loginFormGet);
authRouter.post(
  "/log-in",
  loginValidation,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("log-in-form", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true, // Displays the message set on done callback when set true, or pass message to overwrite
  })
);
authRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in");
  });
});

authRouter.get("/sign-up", signupFormGet);
authRouter.post(
  "/sign-up",
  signupValidation,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return errors to template
      return res.status(400).render("sign-up-form", {
        errors: errors.mapped(),
        old: req.body, // keep the user's imput
      });
    }
    next();
  },
  signupFormPost
);

export default authRouter;
