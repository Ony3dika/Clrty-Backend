import { Router } from "express";
import {
  getAllTasks,
  getTask,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const taskRouter = Router();

taskRouter.get("/", authorize, getAllTasks);
taskRouter.get("/:id", authorize, getTask);
taskRouter.get("/user/:id", authorize, getUserTasks);
taskRouter.post("/", authorize, createTask);
taskRouter.put("/:id", authorize, updateTask);
taskRouter.delete("/:id", authorize, deleteTask);

export default taskRouter;
