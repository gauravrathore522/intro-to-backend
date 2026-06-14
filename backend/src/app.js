import express from "express";

const app = express();

app.use(express.json());

//routes import
import userRoute from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRoute);

// example route : http://localhost:4000/api/v1/users/register



export default app;