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

const authRouter: Router = Router();

authRouter.get("/", isAuth, allPostsGet);
authRouter.get("/log-in", loginFormGet);
authRouter.post(
  "/log-in",
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
authRouter.post("/sign-up", signupFormPost);

export default authRouter;
