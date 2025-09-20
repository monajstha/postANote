import {
  allPostsGet,
  newPostFormGet,
  newPostFormPost,
} from "@controllers/postsController";
import { isAuth } from "@middlewares/authMiddleware";
import { Router } from "express";

const postsRoute = Router();

postsRoute.get("/", isAuth, allPostsGet);
postsRoute.get("/new", isAuth, newPostFormGet);
postsRoute.post("/new", isAuth, newPostFormPost);

export default postsRoute;
