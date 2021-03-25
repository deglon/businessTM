const express = require("express");
const router = express.Router();
const multer = require("multer");

var UserController = require("../controller/UserController.js");
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

const {
  requireSignin,
  adminMiddleware,
  signinController,
  registerController,
  Logout,
} = require("../controller/Authentication");

router.post("/login", signinController);
router.post("/logout", Logout);
router.post("/signup", registerController);
router.put("/updatemyprofile/:id", UserController.updateController);
router.put("/updateuserprofile/:id", UserController.AdminupdateController);
router.get("/search/:id", UserController.getUserById);
router.get(
  "/nbofreservations/:id/:start_date/:end_date",
  UserController.getNumberofReservations
);
router.get(
  "/nbofchekins/:id/:start_date/:end_date",
  UserController.getNumberofCheckins
);
router.get(
  "/nbofcancellations/:id/:start_date/:end_date",
  UserController.getNumberofCancellations
);
//router.put('/update', requireSignin, upload.single("photo"),updateController);
//router.put('/admin/update', requireSignin, adminMiddleware, updateController);
router.post("/add", UserController.addUser);
router.delete("/delete/:id", UserController.removeUser);
router.get("/", UserController.getUser);
router.get("/AccessList", UserController.getAccessList);

module.exports = router;
