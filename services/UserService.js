var User = require("../models/User");
//var History = require("../models/History");
const { ObjectId } = require("mongodb");

exports.getUser = async function (query, page, limit) {
  try {
    var user = await User.find(query);
    return user;
  } catch (e) {
    throw Error("Error while Paginating users");
  }
};

exports.getAccessList = async function (query, page, limit) {
  try {
    var user = await User.findById(query);
    return user.Accesses;
  } catch (e) {
    throw Error("Error while Paginating Access List for this user");
  }
};

//Amira : check impacts on grades, service lines, subservicelines
exports.addUser = async function (document) {
  try {
    var content = await User.create(document);
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while creating new User");
  }
};

exports.getUserById = async function (id) {
  try {
    var user = await User.findById(id);
    console.log("IM HERE");
    return user;
  } catch (e) {
    throw Error("Error while finding this user");
  }
};

exports.updateUser = async function (id, data) {
  try {
    var content = await User.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating the user");
  }
};
//change to archive user and check impacts on grade, sl, ssl, reservations, accesses...
exports.removeUser = async function (id) {
  try {
    var content = await User.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting the user");
  }
};

// exports.getNumberOfReservations = async function (id, start_date, end_date) {
//   try {
//     var history = await History.find({
//       createdAt: {
//         $gte: start_date,
//         $lt: end_date,
//       },
//       user: ObjectId(id),
//     });
//     console.log(history.length);
//     return history.length;
//   } catch (e) {
//     console.log(e);
//     throw Error("error while calculating nb of reservations", e);
//   }
// };

// exports.getNumberOfCheckins = async function (id, start_date, end_date) {
//   try {
//     var history = await History.find({
//       createdAt: {
//         $gte: start_date,
//         $lt: end_date,
//       },
//       user: ObjectId(id),
//       TransactionType: "CHECKIN",
//     });
//     console.log(history.length);
//     return history.length;
//   } catch (e) {
//     console.log(e);
//     throw Error("error while calculating nb of check ins", e);
//   }
// };

// exports.getNumberOfCancellations = async function (id, start_date, end_date) {
//   try {
//     var history = await History.find({
//       createdAt: {
//         $gte: start_date,
//         $lt: end_date,
//       },
//       user: ObjectId(id),
//       TransactionType: "CANCELLATION",
//     });
//     console.log(history.length);
//     return history.length;
//   } catch (e) {
//     console.log(e);
//     throw Error("error while calculating nb of cancellations", e);
//   }
// };

//get by name
