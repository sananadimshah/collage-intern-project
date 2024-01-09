import mongoose from "mongoose";

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collage",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Intern = mongoose.model("Intern", internSchema);
export { Intern };
