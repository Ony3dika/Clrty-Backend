import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();
// Or for specific origin:
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // if using cookies or sessions
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to SubDub");
});

app.listen(PORT, async () => {
  console.log(`Clrty Backend running on port http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
