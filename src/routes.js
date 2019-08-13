const express = require("express");
const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);
const SessionController = require('./app/controllers/SessionControler');
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");
const AppoitmentController = require("./app/controllers/AppointmentController");
const AvailableController = require("./app/controllers/AvailableController");
const authMiddleware = require("./app/middlwares/auth");
const guestMiddleware = require("./app/middlwares/guest");

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");
  next();
})

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single('avatar'), UserController.store);

routes.use("/app", authMiddleware);

routes.get("/app/logout", SessionController.destroy);
routes.get("/app/dashboard", DashboardController.index);

routes.get("files/:file", FileController.show);

routes.get('/app/appointments/new/:provider', AppoitmentController.create);
routes.post('/app/appointments/new/:provider', AppoitmentController.store);

routes.get('/app/available/:provider', AvailableController.index);


module.exports = routes;
