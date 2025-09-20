import { IPostFormValues } from "@interface/post";
import { QueryResult } from "pg";
import { IUserSignup } from "src/interface/user";
import pool from "./pool";

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
    console.log({ rows });
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
    console.log("new post yay");
    const SQL_INSERT_NEW_POST_QUERY = `
          INSERT INTO posts (post_title, post_text, post_image, user_id) VALUES ($1, $2, $3, $4)`;
    const VALUES = [post_title, post_text, post_image, user_id];
    const result: QueryResult = await pool.query(
      SQL_INSERT_NEW_POST_QUERY,
      VALUES
    );
    console.log({ result });
    if (result.rowCount) {
      return result.rowCount;
    }
    throw new Error("Something went wrong on signup");
  } catch (err) {
    console.log("Error while inserting new user in db: ", err);
  }
};
