import { allMessagesGet } from "@controllers/dashboardController";
import { isAuth } from "@middlewares/authMiddleware";
import { Router } from "express";

const dashboardRoute = Router();

dashboardRoute.get("/", isAuth, allMessagesGet);

export default dashboardRoute;
