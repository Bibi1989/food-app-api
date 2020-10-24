"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("./userAuth");
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.Router();
// route to get all projects
router.get("/", userAuth_1.Auth, order_controller_1.getAllOrders);
// route to create a project
router.post("/", userAuth_1.Auth, order_controller_1.createOrder);
router.put("/:id", userAuth_1.Auth, order_controller_1.updateOrder);
router.delete("/", userAuth_1.Auth, order_controller_1.deleteAllOrder);
router.delete("/:id", userAuth_1.Auth, order_controller_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map