const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const { urlencoded } = require("express");
const { next } = require("process");
const { post } = require("./routes");
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require("express-mysql-session");
const {database}= require('./keys');
// inicio
const app = express();

// ajustes
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlerbars"),
  })
);
app.set("view engine", ".hbs");
// midlewares
app.use(session({
  secret: 'owen',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore (database)
}))
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// variables golbales
app.use((req, res, next) => {
  app.locals.success= req.flash('success');
  next();
});
// routes
app.use(require("./routes/index"));
app.use(require("./routes/autenticacion"));
app.use("/links", require("./routes/links"));
// public
app.use(express.static(path.join(__dirname, "public")));
// startin server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
