import { Schema, model, models } from "mongoose";

// Define the schema for the User collection
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"], // Validation rule for unique email
    required: [true, "Email is required!"], // Validation rule for required email
  },
  username: {
    type: String,
    required: [true, "Username is required!"], // Validation rule for required username
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!", // Validation rule for username format and uniqueness
    ],
  },
  image: {
    type: String,
  },
});

// Check if the User model already exists, otherwise create a new model
const User = models.User || model("User", UserSchema);

export default User;
