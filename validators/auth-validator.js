const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
  fullName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "username must be at least of 3 characters" })
    .max(255, { message: "username must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
  role: z.enum(["admin", "parent", "teacher", "student"]),
});

module.exports = signupSchema; 