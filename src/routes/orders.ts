import { Router } from "express";
import { Auth } from "./userAuth";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  deleteAllOrder,
} from "../controllers/order.controller";

const router = Router();

// route to get all projects
router.get("/", Auth, getAllOrders);

// route to create a project
router.post("/", Auth, createOrder);

router.put("/:id", Auth, updateOrder);

router.delete("/", Auth, deleteAllOrder);

router.delete("/:id", Auth, deleteOrder);

export default router;
