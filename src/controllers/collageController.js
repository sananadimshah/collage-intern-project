import { College } from "../models/collegeModel.js";

// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const createCollege = async (req, res) => {
  try {
    const { name, fullName, logoLink } = req.body;

    if (!name || !fullName) {
      return res
        .status(400)
        .send({ status: false, msg: "All fields are required" });
    }

    const exitedname = await College.findOne({ name });
    if (exitedname) {
      return res.status(400).send({
        status: false,
        msg: `This name already exits please take another name`,
      });
    }
    const newCollege = await College.create(req.body);
    return res.status(201).send({ status: true, Data: newCollege });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const collegeDetails = async (req, res) => {
  try {
    const collegeName = req.query.collegeName;
    if (!collegeName) {
      return res
        .status(400)
        .send({ status: true, msg: "Please provide College name" });
    }
    const collegedetails = await College.findOne({ name: collegeName });

    if (!collegedetails) {
      return res
        .status(404)
        .send({ status: true, msg: "No such College exist" });
    }

    console.log(collegedetails);
    return res.status(200).send({ status: true, Data: collegedetails });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// - Returns the college details for the requested college (Expect a query parameter by the name `collegeName`. This is anabbreviated college name. For example `iith`)
// - Returns the list of all interns who have applied for internship at this college.
// - The response structure should look like [this](#college-details)

export { createCollege, collegeDetails };
