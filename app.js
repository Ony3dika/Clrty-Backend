import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import financeRouter from "./routes/finance.routes.js";
const app = express();
// Or for specific origin:

const allowedOrigins = ["https://clrty.vercel.app/", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you need to allow cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/finance", financeRouter);
app.get("/", (req, res) => {
  res.send("Welcome to SubDub");
});

app.listen(PORT, async () => {
  console.log(`Clrty Backend running on port http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
