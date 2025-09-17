import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const { NODE_ENV, LOCAL_DATABASE_URL, PROD_DATABASE_URL, USERNAME, PASSWORD } =
  process.env;

// Creating Users table
const SQL_CREATE_TABLE_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_club_member BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

// Creating Posts table
const SQL_CREATE_TABLE_POSTS = `
CREATE TABLE IF NOT EXISTS posts (
  post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  post_title VARCHAR(255) NOT NULL,
  post_text VARCHAR (255) NOT NULL,
  post_image VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(user_id) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

const main = async () => {
  console.log(`Seeding ${NODE_ENV}  Database...`);
  const client = new Client({
    connectionString:
      NODE_ENV === "production" ? PROD_DATABASE_URL : LOCAL_DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(SQL_CREATE_TABLE_USERS);
    await client.query(SQL_CREATE_TABLE_POSTS);
    console.log("Seeding Completed");
  } catch (error) {
    console.log("Error seeding database", error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

main();
