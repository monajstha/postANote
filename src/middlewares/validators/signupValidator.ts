import { checkSchema } from "express-validator";
import pool from "@db/pool";

export const signupValidation = checkSchema({
  first_name: {
    trim: true,
    notEmpty: {
      errorMessage: "First name is required",
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "First name must be at least 2 characters long",
    },
    escape: true,
  },
  last_name: {
    trim: true,
    notEmpty: {
      errorMessage: "Last name is required",
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "First name must be at least 2 characters long",
    },
    escape: true,
  },
  username: {
    trim: true,
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      options: { min: 4 },
      errorMessage: "Username must be at least 4 characters long",
    },
    custom: {
      options: async (value) => {
        const { rows } = await pool.query(
          "SELECT 1 FROM users WHERE username = $1",
          [value]
        );
        if (rows.length > 0) {
          throw new Error("Username already in use");
        }
        return true;
      },
    },
    escape: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  confirm_password: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      },
    },
  },
});
