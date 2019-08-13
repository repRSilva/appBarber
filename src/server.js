const express = require("express");
const session = require("express-session");
const Lokistore = require("connect-loki")(session);
const nunjucks = require("nunjucks");
const path = require("path");
const flash = require("connect-flash");

class app {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != "production";
    this.middlewares();
    this.views();
    this.routes();
  }
  middlewares() {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(flash());
    this.express.use(session({
      store: new Lokistore({
        path: path.resolve(__dirname, "..", "tmp", "sessions.db")
      }),
      name: "root",
      secret: "MyAppSecret",
      resave: false,
      saveUninitialized: true,
    }));
  }
  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });
    this.express.use(express.static(path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }
  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new app().express;
