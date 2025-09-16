import { Router } from "express";
import {
  loginFormGet,
  loginFormPost,
  signupFormGet,
  signupFormPost,
} from "@controllers/authController";

const router: Router = Router();

router.get("/log-in", loginFormGet);
router.post("/log-in", loginFormPost);
router.get("/sign-up", signupFormGet);
router.post("/sign-up", signupFormPost);

export default router;
