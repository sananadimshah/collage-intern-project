import e from "express";
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
    const newCollege = await College.create({
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      // Assuming other fields might exist in your College model
      // Add them here as necessary
    });

    console.log("New College created:", newCollege); // Log the newly created college

    return res.status(201).send(newCollege); // 201 for successful creation
  } catch (err) {
    console.error("Error creating college:", err); // Log any error that occurs
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const collegeDetails = async (req, res) => {
  try {
  } catch (error) {}
};

export { createCollege, collegeDetails };
