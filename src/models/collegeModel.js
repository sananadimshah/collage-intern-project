import mongoose, { Schema } from "mongoose";
const collegeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    logoLink: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const College = mongoose.model("College", collegeSchema);
