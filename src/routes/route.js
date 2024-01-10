import express from "express";
import {
  createCollege,
  collegeDetails,
} from "../controllers/collageController.js";
import { interns } from "../controllers/internController.js";

const router = express.Router();

//******************* Collage ***************
router.post("/colleges", createCollege);

router.get("/collegeDetails", collegeDetails);

router.post("/interns", interns);

export default router;
