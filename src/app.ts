import express, { Request, Response, Express, NextFunction } from "express";
import { errorHandler } from "@middlewares/errorHandler";
import authRoutes from "@routes/authRoute";
import path from "path";
import methodOverride from "method-override";
import passport from "@config/passport";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "@db/pool";
import postsRoute from "@routes/postsRoute";

const app = express();

app.use(express.json());
// this app level express middleware parses form data to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // look for ?_method=PUT in POST requests

// declaring the use of ejs engine and to look for files inside views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// serve static assets
const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

const pgSession = connectPgSimple(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(passport.session());

app.use((req, res, next) => {
  console.log("Session", req.session);
  //   req.locals.currentUser = req.user;
  console.log("req.user", req.user);
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/posts", postsRoute);

// Handle all unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("The page you are looking for isn't here :(");
  (error as any).status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

export default app;
