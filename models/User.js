var mongoose = require("mongoose");
const crypto = require("crypto");

var UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    Email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
    },
    hashed_password: { type: String, required: true },
    salt: String,
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      autopopulate: false,
    },
    //Amira : added registrationNumber(matricule)
    registrationNumber: String,
    telephone: Number,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    Accesses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Access",
        autopopulate: true,
      },
    ],

    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
        autopopulate: true,
      },
    ],
    serviceLine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceLine",
    },
    //Amira : added subserviceLine
    subServiceLine: {
      type: String,
    },

    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }

  //ResetPasswordToken: {type : String,default:null},
);
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("User", UserSchema);
