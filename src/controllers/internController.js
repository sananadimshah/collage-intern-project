import { College } from "../models/collegeModel.js";
import { Intern } from "../models/intern.model.js";
import {
  IsvalidEmail,
  isvalidMobileNumber,
  isvalidObjectId,
} from "../../util/validator.js";
const interns = async (req, res) => {
  try {
    const { name, mobile, email, collegeId } = req.body;
    if (!name || !mobile || !email || !collegeId) {
      return res
        .status(400)
        .send({ status: false, msg: "All filed are required" });
    }
    if (!IsvalidEmail(email))
      return res.status(400).send({ status: false, msg: "Invalid Email" });

    const exitedEmail = await Intern.findOne({ email });
    if (exitedEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "This email already used" });
    }
    if (!isvalidMobileNumber(mobile))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid Mobile Number" });

    const exitedmobileNumber = await Intern.findOne({ mobile });
    if (exitedmobileNumber) {
      return res
        .status(400)
        .send({ status: false, msg: "This MobileNumber already used" });
    }
    if (!isvalidObjectId(collegeId))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid Mobile Number" });

    const existCollege = await College.findById(collegeId._id);
    console.log(existCollege);
    if (!existCollege) {
      return res
        .status(400)
        .send({ status: false, msg: "This college is not present" });
    }

    const newIntern = await Intern.create(req.body);
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

// - Create a document for an intern.
// - Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
// - Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like [this](#-response-structure)
//   successful
// - Return HTTP status 400 for an invalid request with a response body like [this]
