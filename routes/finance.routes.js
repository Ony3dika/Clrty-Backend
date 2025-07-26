import { Router } from "express";
import {
  getAllFinances,
  getFinance,
  createFinance,
  updateFinance,
  deleteFinance,
} from "../controllers/finance.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const financeRouter = Router();

financeRouter.get("/", authorize, getAllFinances);
financeRouter.get("/:id", authorize, getFinance);
financeRouter.post("/create/", authorize, createFinance);
financeRouter.put("/update/:id", authorize, updateFinance);
financeRouter.delete("/delete/:id", authorize, deleteFinance);

export default financeRouter;
