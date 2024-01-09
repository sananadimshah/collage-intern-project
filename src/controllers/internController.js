import { College } from "../models/collegeModel.js";
import { Intern } from "../models/intern.model.js";
import {
  IsvalidEmail,
  isvalidMobileNumber,
  isvalidObjectId,
} from "../../util/validator.js";
import { object } from "mongoose/lib/utils.js";
const interns = async (req, res) => {
  try {
    const { name, mobile, email, collegeName } = req.body;
    if (!name || !mobile || !email || !collegeName) {
      return res
        .status(400)
        .send({ status: false, msg: "All filed are required" });
    }
    if (!IsvalidEmail(email))
      return res.status(400).send({ status: false, msg: "Invalid Email" });

    const exitedEmail = await Intern.findOne({ email });
    if (exitedEmail) {
      return res.status(400).send({
        status: false,
        msg: `This EmailId is already registered`,
      });
    }
    if (!isvalidMobileNumber(mobile))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid Mobile Number" });

    const exitedmobileNumber = await Intern.findOne({ mobile });
    if (exitedmobileNumber) {
      return res.status(400).send({
        status: false,
        msg: "This Mobile Number is already registered",
      });
    }
    const existCollegeId = await College.findOne({
      $or: [{ fullName: collegeName }, { name: collegeName }],
    }).select({ _id: 1 });

    console.log(existCollegeId);

    if (!existCollegeId) {
      return res
        .status(400)
        .send({ status: false, msg: "This college is not present" });
    }

    const newIntern = await Intern.create({
      name,
      mobile,
      email,
      collegeId: existCollegeId,
    });
    return res.status(201).send({
      status: true,
      msg: "Successfully Intern created",
      Data: newIntern,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export { interns };
