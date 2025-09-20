import { Request, Response, NextFunction } from "express";
import * as db from "@db/queries";
import { IUSer } from "@interface/user";
import getAvatarInitials from "@utils/helpers/avatarInitials";
import getDayAndTime from "@utils/helpers/dateAndTime";

export const allPostsGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await db.getAllPosts();
    res.render("dashboard", {
      posts,
      path: req.path,
      getDayAndTime,
      getAvatarInitials,
    });
  } catch (error) {}
};

export const newPostFormGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("req.path", req.path);
  res.render("new-post-form", {
    path: req.path,
    errors: {},
    old: {},
  });
};

export const newPostFormPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { post_title, post_text, post_image } = req.body;
    const rowCount = await db.insertNewPost({
      post_title,
      post_text,
      post_image: post_image || null,
      user_id: (req.user as IUSer).user_id,
    });
    console.log({ rowCount });
    if (rowCount) {
      res.status(201).redirect("/");
    }
  } catch (error) {
    console.log("Error while adding a new post: ", error);
  }
};
