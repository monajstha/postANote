import { IPostFormValues, IUserPosts } from "@interface/post";
import { QueryResult } from "pg";
import { IUserSignup } from "src/interface/user";
import pool from "./pool";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const insertNewUser = async ({
  first_name,
  last_name,
  username,
  password,
}: IUserSignup) => {
  try {
    const SQL_INSERT_NEW_USER_QUERY = `
        INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`;
    const VALUES = [first_name, last_name, username, password];
    const result: QueryResult = await pool.query(
      SQL_INSERT_NEW_USER_QUERY,
      VALUES
    );
    if (result.rowCount) {
      return result.rowCount;
    }
    throw new Error("Something went wrong on signup");
  } catch (err) {
    console.log("Error while inserting new user in db: ", err);
  }
};

export const getAllPosts = async () => {
  try {
    const SQL_GET_ALL_POSTS_QUERY = `
    SELECT 
    posts.post_id,
    posts.post_title,
    posts.post_text,
    posts.post_image,
    posts.created_at,
    users.first_name,
    users.last_name
    FROM posts
    INNER JOIN users ON posts.user_id = users.user_id
    ORDER BY posts.created_at DESC;`;
    const { rows } = await pool.query(SQL_GET_ALL_POSTS_QUERY);
    return rows;
  } catch (err) {
    console.log("Error while getting all posts from db: ", err);
  }
};

export const insertNewPost = async ({
  post_title,
  post_text,
  post_image,
  user_id,
}: IPostFormValues) => {
  try {
    const SQL_INSERT_NEW_POST_QUERY = `
          INSERT INTO posts (post_title, post_text, post_image, user_id) VALUES ($1, $2, $3, $4)`;
    const VALUES = [post_title, post_text, post_image, user_id];
    const result: QueryResult = await pool.query(
      SQL_INSERT_NEW_POST_QUERY,
      VALUES
    );
    if (result.rowCount) {
      return result.rowCount;
    }
    throw new Error("Something went wrong on signup");
  } catch (err) {
    console.log("Error while inserting new user in db: ", err);
  }
};

export const getUserProfile = async (user_id: string) => {
  try {
    const SQL_GET_USER_DETAILS_QUERY = `
            SELECT * FROM users WHERE user_id=$1`;
    const VALUES = [user_id];

    const { rows }: QueryResult = await pool.query(
      SQL_GET_USER_DETAILS_QUERY,
      VALUES
    );

    if (rows.length) {
      return rows[0];
    }
    throw new Error("Something went wrong ");
  } catch (err) {
    console.log("Error while getting user profile from db: ", err);
  }
};

export const getUserPosts = async (user_id: string): Promise<IUserPosts> => {
  try {
    const SQL_GET_USER_POSTS_QUERY = `
      SELECT * FROM posts WHERE user_id=$1`;
    const VALUES = [user_id];

    const { rows, rowCount }: QueryResult = await pool.query(
      SQL_GET_USER_POSTS_QUERY,
      VALUES
    );
    if (rows.length && rowCount) {
      return {
        userPosts: rows,
        totalPosts: rowCount,
      };
    }
    throw new Error("Something went wrong!");
  } catch (err) {
    console.log("Error while getting user's posts from db: ", err);
    return {
      userPosts: [],
      totalPosts: 0,
    };
  }
};

export const updateUserClubMemberStatus = async (
  secret_passcode: string,
  user_id: string
) => {
  try {
    const hashedSecretPasscode = await bcrypt.hash(
      process.env.SECRET_PASSCODE as string,
      10
    );
    const match = await bcrypt.compare(secret_passcode, hashedSecretPasscode);
    console.log({ match });
    if (!match) return false;
    const SQL_UPDATE_USER_CLUB_MEMBER_STATUS_QUERY = `
            UPDATE users
            SET
            is_club_member = true
            WHERE user_id=$1
            `;
    const VALUES = [user_id];

    const { rowCount }: QueryResult = await pool.query(
      SQL_UPDATE_USER_CLUB_MEMBER_STATUS_QUERY,
      VALUES
    );
    return !!rowCount;
  } catch (err) {
    console.log("Error while getting user's posts from db: ", err);
  }
};
