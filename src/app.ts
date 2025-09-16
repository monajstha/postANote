import express, { Request, Response, Express, NextFunction } from "express";
import { errorHandler } from "@middlewares/errorHandler";
import routes from "@routes/index";
// import categoryRoutes from '@routes/categoryRoutes';
// import authRoutes from '@routes/authRoutes';
import path from "path";
import methodOverride from "method-override";

const app = express();

app.use(express.json());
// this app level express middleware parses form data to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // look for ?_method=PUT in POST requests

// declaring the use of ejs engine and to look for files inside views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Routes
app.use("/", routes);
// app.use('/categories', categoryRoutes);
// app.use('/auth', authRoutes);

// serve static assets
const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

// Handle all unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("The page you are looking for isn't here :(");
  (error as any).status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

export default app;
