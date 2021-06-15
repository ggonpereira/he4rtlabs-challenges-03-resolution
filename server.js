const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const connection = require("./src/models/Database");
const session = require("express-session");

// Setting connection with database
connection
  .authenticate()
  .then(() => {
    console.log("Successfully connected with database.");
  })
  .catch((error) => {
    console.log(error);
  });

// Configuring sessions
app.use(
  session({
    secret: process.env.SECRET_PHRASE,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    },
  })
);

// Setting public files folder
app.use(express.static(path.resolve(__dirname, "public")));

// Setting view engine and views folder
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Body parser (to capture req.body content)
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// Using predefined routes
app.use(routes);

app.listen(80, () => {
  console.log("App running: http://localhost");
});
