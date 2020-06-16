const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const publicDomain = process.env.PUBLIC_DOMAIN || "http://localhost:3000";
//const session = require("express-session");
//const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

const apiRouter = require("./routes/api");
//const usersRouter = require("./routes/users");

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error(err));

// EXPRESS SERVER INSTANCE
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    credentials: true,
    origin: [publicDomain],
  })
);

//CORS SETTINGS TO ALLOW CROSS-ORIGIN INTERACTION
app.use(
  cors({
    credentials: true,
    origin: (process.env.PUBLIC_DOMAIN, "https://dnd-quiz-game.herokuapp.com"),
  })
);

// ROUTER MIDDLEWARE
app.use("/api", apiRouter);
//app.use("/users", usersRouter);

// ROUTE FOR SERVING REACT APP (index.html)
app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

// ERROR HANDLING
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ code: "not found" });
});

// error handler
app.use(function (err, req, res, next) {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});

module.exports = app;
