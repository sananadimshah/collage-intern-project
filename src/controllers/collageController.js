import { College } from "../models/collegeModel.js";
import { Intern } from "../models/intern.model.js";

// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const createCollege = async (req, res) => {
  try {
    const { name, fullName, logoLink } = req.body;

    if (!name || !fullName || !logoLink) {
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
    const data = { name, fullName, logoLink };

    const newCollege = await College.create(data);
    return res.status(201).send({ status: true, Data: newCollege });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
const collegeDetails = async (req, res) => {
  try {
    const college = req.query.collegeName;
    console.log(college);
    if (!college) {
      return res.status(400).send({
        status: false,
        msg: "collegeName is required",
      });
    }
    const collegeDetail = await College.findOne({
      name: college,
    }).lean();
    console.log(collegeDetail);

    const intern = await Intern.find({
      collegeId: collegeDetail._id,
    })
      .select({ _id: 1, name: 1, email: 1, mobile: 1 })
      .lean();
    console.log(intern);

    return res.status(200).send({
      status: true,
      data: {
        name: collegeDetail.name,
        fullName: collegeDetail.fullName,
        logoLink: collegeDetail.logoLink,
        interns: intern,
      },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
// const collegeDetails = async (req, res) => {
//   try {
//     const collegeName = req.query.collegeName;
//     console.log("collegeName:", collegeName);

//     if (!collegeName) {
//       console.log("College name is missing");
//       return res.status(400).send({
//         status: false,
//         msg: "collegeName is required",
//       });
//     }

//     const collegeDetail = await College.findOne({
//       name: collegeName,
//       isDeleted: false,
//     });
//     console.log("collegeDetail:", collegeDetail);

//     if (!collegeDetail) {
//       console.log("College not found");
//       return res.status(404).send({
//         status: false,
//         msg: "College not found",
//       });
//     }

//     return res.status(200).send({
//       status: true,
//       data: collegeDetail,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ status: false, msg: err.message });
//   }
// };

// - Returns the college details for the requested college (Expect a query parameter by the name `collegeName`. This is anabbreviated college name. For example `iith`)
// - Returns the list of all interns who have applied for internship at this college.
// - The response structure should look like [this](#college-details)

export { createCollege, collegeDetails };
