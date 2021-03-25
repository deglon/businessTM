var UserService = require("../services/UserService");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
var async = require("async");
const multer = require("multer");
var fileUpload = require("../helpers/upload-middleware");

exports.getUser = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getUser({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAccessList = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getAccessList({ user: req.user }, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully access list Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.getUserById = async function (req, res, next) {
  try {
    var content = await UserService.getUserById(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "User Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofReservations = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfReservations(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of reservations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofCheckins = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfCheckins(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of checkins successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofCancellations = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfCancellations(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of cancellations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateController = (req, res) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("photo");

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    // console.log(user);

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        if (req.body.newpassword) {
          //console.log(req.body.password);
          if (req.body.newpassword.length < 6) {
            return res.status(400).json({
              error: "Password should be min 6 characters long",
            });
          } else {
            if (!user.authenticate(req.body.oldpassword)) {
              console.log("YOU ARE IN WRONG PASSWORD");
              return res.status(400).json({
                errors: "Old password is incorrect",
              });
            } else {
              console.log("OLD PASSWORD IS", req.body.oldpassword);

              user.password = req.body.newpassword;
            }
          }
        }
        if (req.file) {
          user.photo = req.file.filename;
        }

        user.save((err, updatedUser) => {
          if (err) {
            console.log("USER UPDATE ERROR", err);
            return res.status(400).json({
              error: "User update failed",
            });
          }
          updatedUser.hashed_password = undefined;
          updatedUser.salt = undefined;
          res.json(updatedUser);
        });
      }
    });
  });
};

exports.AdminupdateController = (req, res) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("photo");

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    // console.log(user);

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        if (req.body.password) {
          //console.log(req.body.password);
          if (req.body.password.length < 6) {
            return res.status(400).json({
              error: "Password should be min 6 characters long",
            });
          } else {
            if (!user.authenticate(req.body.oldpassword)) {
              console.log("YOU ARE IN WRONG PASSWORD");
              return res.status(400).json({
                errors: "Old password is incorrect",
              });
            } else {
              console.log("OLD PASSWORD IS", req.body.oldpassword);

              user.password = req.body.password;
            }
          }
        }
        if (req.file) {
          user.photo = req.file.filename;
        }

        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }

        if (req.body.email) {
          user.Email = req.body.email;
        }
        if (req.body.role) {
          user.role = req.body.role;
        }
        if (req.body.registrationNumber) {
          user.registrationNumber = req.body.registrationNumber;
        }
        if (req.body.telephone) {
          user.telephone = req.body.telephone;
        }
        if (req.body.grade) {
          user.grade = req.body.grade;
        }
        if (req.body.serviceLine) {
          user.serviceLine = req.body.serviceLine;
        }
        if (req.body.subserviceLine) {
          user.subserviceLine = req.body.subserviceLine;
        }

        user.save((err, updatedUser) => {
          if (err) {
            console.log("USER UPDATE ERROR", err);
            return res.status(400).json({
              error: "User update failed",
            });
          }
          updatedUser.hashed_password = undefined;
          updatedUser.salt = undefined;
          res.json(updatedUser);
        });
      }
    });
  });
};

exports.addUser = async function (req, res, next) {
  try {
    User.findOne({ Email: req.body.Email }).then((user) => {
      if (!user) {
        var content = UserService.addUser(req.body);
        return res.status(200).json({
          status: 200,
          data: content,
          message: "User added succesfully",
        });
      } else {
        res.json("User already exist");
      }
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeUser = async function (req, res, next) {
  try {
    var content = await UserService.removeUser(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "User Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
