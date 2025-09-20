import { allPostsGet } from "@controllers/postsController";
import { isAuth } from "@middlewares/authMiddleware";
import { Router } from "express";

const dashboardRoute = Router();

dashboardRoute.get("/", isAuth, allPostsGet);

export default dashboardRoute;
