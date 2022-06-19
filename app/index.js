const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("../config/routers");
const cors = require("cors");

// const publicDir = path.join(__dirname, "../public");
// const viewsDir = path.join(__dirname, "./views");
const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install View Engine */
// app.set("views", viewsDir);
// app.set("view engine", "ejs");

/** Set Public Directory */
// app.use(express.static(publicDir));

app.use(cors())

/** Install Router */
app.use(router);

module.exports = app;
