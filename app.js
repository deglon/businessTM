var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const cron = require("node-cron");
const shell = require("shelljs");
var CronJob = require("cron").CronJob;
var bodyParser = require("body-parser");
const multer = require("multer");
var u = multer();

/*var job = new CronJob('44 16 * * *', function() {
  console.log('You will see this message AT 16:44');
}, null, true, 'America/Los_Angeles');
job.start();*/
/*cron.schedule("52 16 * * *",function(){
  console.log("you will see this msg at 16:50");
 
});*/

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const uri =
  process.env.MONGODB_URI ||
  `mongodb://localhost/please-set-process-env-mongodb-uri`;
var app = express();
const store = new mongoDBStore({
  uri: uri,
  collection: "sessions",
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(cookieParser());
//app.use(u.array());

app.use(express.static(path.join(__dirname, "public")));
//secret doit etre changé en production
// we can configure a cookie here by adding cookie:expires etc..
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type: application/json"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api/serviceline", require("./routes/ServiceLine"));
//app.use("/api/floor", require("./routes/Floor"));
// app.use("/api/history", require("./routes/History"));
// app.use("/api/building", require("./routes/Building"));
// app.use("/api/Zone", require("./routes/Zone"));
// app.use("/api/Desk", require("./routes/Desk"));
 app.use("/api/User", require("./routes/User"));
 app.use("/api/Grade", require("./routes/Grade"));
// app.use("/api/Access", require("./routes/Access"));
// app.use("/api/History", require("./routes/History"));
// app.use("/api/reservation", require("./routes/Reservation"));
app.use("/api/SubServiceLine", require("./routes/SubServiceLine"));
// app.use("/api/Group", require("./routes/Group"));
// app.use("/api/GroupAccess", require("./routes/GroupAccess"));
// app.use("/api/IndividualAccess", require("./routes/IndividualAccess"));
//app.use("/api/dayreservation", require("./routes/DayReservation"));
//app.use("/availability", require("./routes/AvailabilityRoutes"));
//app.use("/reserve", require("./routes/ReservationRoute"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.PORT;
console.log(`Your port is ${port}`);
const mongoose = require("mongoose");

// Don't forget to set "MONGODB_URI" in ~/server/.env
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

module.exports = app;
