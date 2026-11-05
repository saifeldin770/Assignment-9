import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../common/enum/user.enum.js";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      macLength: 20,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      macLength: 20,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.Male,
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER,
    },
    DOB: Date,
    confirmEmail: {
      type: Boolean,
      default: false,
      profilePicPath: String,
      coverPicsPath: [String],
      deletedAt: Date,
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema
  .virtual("username")
  .get(function () {
    return `${this.get("firstName")} ${this.get("lastName")}`;
  })
  .set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.set({ firstName, lastName });
  });
const userModel = mongoose.model("Users", userSchema);
export default userModel;
