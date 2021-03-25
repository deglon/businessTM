const express = require("express");
const router = express.Router();
var GradeController = require("../controller/GradeController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/", GradeController.getGrades);


router.post("/add", GradeController.addGrade);
router.put("/update/:id", GradeController.updateGrade);
router.delete("/remove/:id",GradeController.removeGrade);

router.get("/search/:id", GradeController.getGradeById);
router.get("/AccessList", GradeController.getAccessList);

module.exports = router;
