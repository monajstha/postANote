import { Request, Response, NextFunction } from "express";
import * as db from "@db/queries";
import { IUSer } from "@interface/user";
import getDayAndTime from "@utils/helpers/dateAndTime";

export const profileGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUSer;
    const { userPosts, totalPosts } = await db.getUserPosts(user.user_id);
    res.render("profile", {
      userPosts,
      totalPosts,
      getDayAndTime,
    });
  } catch (error) {
    console.log("Error while getting user posts: ", error);
  }
};

export const userClubMemberStatusUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { secret_passcode } = req.body;
    const user = req.user as IUSer;
    const updateResult = await db.updateUserClubMemberStatus(
      secret_passcode,
      user?.user_id
    );
    if (updateResult) {
      return res.status(200).json({ sucess: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log("Error while updating club member status: ", error);
  }
};
