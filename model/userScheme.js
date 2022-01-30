import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: uuidv4(),
    },
  },
  {
    versionKey: false,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model("user", userSchema);
export default UserModel;
