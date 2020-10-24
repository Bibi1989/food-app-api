"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let value = req.body;
    let user = req.user;
    let id = user._doc._id;
    console.log("order === ", { value, id });
    try {
        const foodOrder = yield order_model_1.default.create(Object.assign(Object.assign({}, value), { user: id }));
        res.json({ status: "success", data: foodOrder });
    }
    catch (error) {
        console.log("error >> ", error);
        res.status(400).json({ status: "error", error: error.message });
    }
});
exports.getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.user;
    let id = user._doc._id;
    try {
        const orders = yield order_model_1.default.find({ user: id });
        res.json({ status: "success", data: orders });
    }
    catch (error) {
        res.status(400).json({ status: "error", error: error.message });
    }
});
exports.updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let value = req.body;
    try {
        const foodOrder = yield order_model_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, value), { new: true });
        res.json({ status: "success", data: foodOrder });
    }
    catch (error) {
        res.status(400).json({ status: "error", error: error.message });
    }
});
exports.deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Delete ID >> ", req.params.id);
    try {
        yield order_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ status: "success", message: "Deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ status: "error", error: error.message });
    }
});
exports.deleteAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.default.deleteMany({});
        res.json({ status: "success", message: "Clear All successfully" });
    }
    catch (error) {
        res.status(400).json({ status: "error", error: error.message });
    }
});
//# sourceMappingURL=order.controller.js.map