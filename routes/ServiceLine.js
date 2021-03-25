const express = require("express");
const router = express.Router();
var ServiceLineController = require("../controller/ServiceLineController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/", ServiceLineController.getServiceLine);

router.post("/add", ServiceLineController.addNewServiceLine);
router.put("/update/:id", ServiceLineController.updateServiceLine);
router.delete("/remove/:id", ServiceLineController.removeServiceLine);
router.get("/search/:id", ServiceLineController.getServiceLineById);
router.get("/accessList", ServiceLineController.getAccessList);

module.exports = router;
