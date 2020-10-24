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
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userAuth_1 = require("./userAuth");
const user_model_1 = __importDefault(require("../models/user.model"));
const router = express_1.Router();
// route to get all users
router.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    res.json({ users });
}));
router.get("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield userController_1.loadUser(Number(id));
    res.json({ user });
}));
// router.get("/verify/:token", async (req: any, res) => {
//   const user: any = await jwt.decode(req.params.token);
//   console.log(user);
//   await VeryUser(user.id, user, req.params.token, res);
//   // res.redirect("http://localhost:3000");
//   res.redirect("https://b-manager.netlify.app");
// });
// route to get a single user
// router.get("/user/:id", async (req, res) => {
//   const users = await User.findOne({
//     where: { id: req.params.id },
//     include: [Project],
//   });
//   res.json({ users });
// });
// route to create a user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userController_1.registerUser(req.body);
    if (user.status === "error")
        return res.status(404).json({ data: user });
    res.json({ data: user });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userController_1.loginUser(req.body);
    if (user.status === "error")
        return res.status(404).json({ data: user });
    res.header("auth", user.token);
    res.json({ data: user });
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const destroy = yield user_model_1.default.findByIdAndDelete({
        id,
    });
    res.json({ destroy });
}));
exports.default = router;
//# sourceMappingURL=users.js.map