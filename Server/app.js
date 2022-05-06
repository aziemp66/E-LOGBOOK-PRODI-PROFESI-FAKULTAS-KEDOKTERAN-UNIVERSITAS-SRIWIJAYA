const express = require("express");

const app = express();
const db = require("./models");

const corsMiddleware = require("./middlewares/cors");
const verifyTokenMiddleware = require("./middlewares/verifyToken");
const verifyRolesMiddleware = require("./middlewares/verifyRoles");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const authRoutes = require("./router/auth.routes");
const studentRoutes = require("./router/student.routes");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(corsMiddleware);

app.use("/api", authRoutes);

app.use(verifyTokenMiddleware);

app.use(
	"/api/student",
	verifyRolesMiddleware.bind(null, "student"),
	studentRoutes
);

app.use(errorHandlerMiddleware);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
});
