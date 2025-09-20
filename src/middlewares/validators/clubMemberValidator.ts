import { checkSchema } from "express-validator";

export const clubMemberValidation = checkSchema({
  secret_passcode: {
    trim: true,
    notEmpty: {
      errorMessage: "Secret passcode is required",
    },
    isLength: {
      options: { min: 4 },
      errorMessage: "Passcode must be at least 4 characters long",
    },
  },
});
