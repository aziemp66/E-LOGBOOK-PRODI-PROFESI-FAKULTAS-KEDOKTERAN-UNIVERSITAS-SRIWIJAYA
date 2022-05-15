const express = require("express");

const app = express();
const db = require("./models");

const corsMiddleware = require("./middlewares/cors");
const verifyTokenMiddleware = require("./middlewares/verifyToken");
const verifyRolesMiddleware = require("./middlewares/verifyRoles");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const authRoutes = require("./router/auth.routes");
const studentRoutes = require("./router/student.routes");
const adminRoutes = require("./router/admin.routes");
const supervisorRoutes = require("./router/supervisor.routes");
const helperRoutes = require("./router/helper.routes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(corsMiddleware);

app.use("/api/auth", authRoutes);

app.use(verifyTokenMiddleware);

app.use(
	"/api/helper",
	verifyRolesMiddleware.bind(null, "student/admin/lecturer/inspector"),
	helperRoutes
);

app.use(
	"/api/student",
	verifyRolesMiddleware.bind(null, "student"),
	studentRoutes
);

app.use("/api/admin", verifyRolesMiddleware.bind(null, "admin"), adminRoutes);

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
