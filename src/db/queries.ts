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
