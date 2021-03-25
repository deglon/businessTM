const express = require("express");
const router = express.Router();
var SubServiceLineController = require("../controller/SubServiceLineController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/",requireSignin, adminMiddleware, SubServiceLineController.getSubServiceLine);

router.post("/add", SubServiceLineController.addNewSubServiceLine);
router.put("/update/:id", SubServiceLineController.updateSubServiceLine);
router.delete("/remove/:id",SubServiceLineController.removeSubServiceLine);
router.get("/search/:id",SubServiceLineController.getSubServiceLineById);
router.get("/accessList", SubServiceLineController.getAccessList);

module.exports = router;
