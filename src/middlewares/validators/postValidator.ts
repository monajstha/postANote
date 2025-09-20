import { checkSchema } from "express-validator";

export const postValidation = checkSchema({
  post_title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isLength: {
      options: { min: 4 },
      errorMessage: "Title must be at least 4 characters long",
    },
  },
  post_text: {
    notEmpty: {
      errorMessage: "Description is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Description must be at least 12 characters long",
    },
  },
});
