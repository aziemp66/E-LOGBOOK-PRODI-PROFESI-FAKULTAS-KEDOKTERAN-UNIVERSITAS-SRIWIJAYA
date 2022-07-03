require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

const verifyTokenMiddleware = require("./middlewares/verifyToken");
const verifyRolesMiddleware = require("./middlewares/verifyRoles");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const authRoutes = require("./router/auth.routes");
const studentRoutes = require("./router/student.routes");
const adminRoutes = require("./router/admin.routes");
const supervisorRoutes = require("./router/supervisor.routes");
const lecturerRoutes = require("./router/lecturer.routes");
const masterRoutes = require("./router/master.routes");

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/activites", express.static("./public/activities"));
app.use("/legalizations", express.static("./public/legalizations"));
app.use("/profile-pictures", express.static("./public/profile-pictures"));

app.use("/api/auth", authRoutes);

app.use(verifyTokenMiddleware);

app.use(
  "/api/lecturer",
  verifyRolesMiddleware.bind(null, "lecturer"),
  lecturerRoutes
);

app.use(
  "/api/student",
  verifyRolesMiddleware.bind(null, "student"),
  studentRoutes
);

app.use("/api/admin", verifyRolesMiddleware.bind(null, "admin"), adminRoutes);

app.use(
  "/api/master",
  verifyRolesMiddleware.bind(null, "master"),
  masterRoutes
);

app.use(
  "/api/supervisor",
  verifyRolesMiddleware.bind(null, "supervisor"),
  supervisorRoutes
);

app.use(errorHandlerMiddleware);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
