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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateUser_1 = require("../validation/validateUser");
const user_model_1 = __importDefault(require("../models/user.model"));
exports.registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateUser_1.validateUserRegister(user);
    if (error.email)
        return { status: "error", error: error.email };
    if (error.phone)
        return { status: "error", error: error.phone };
    if (error.password)
        return { status: "error", error: error.password };
    const checkUserExist = yield user_model_1.default.findOne({
        where: { email: value.email },
    });
    if (checkUserExist)
        return { status: "error", error: "User exist already" };
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(value.password, salt);
    try {
        const registered = yield user_model_1.default.create(Object.assign(Object.assign({}, value), { password: hashedPassword }));
        console.log("Register === ", typeof registered);
        const token = yield jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, registered), { password: null }), process.env.SECRET_KEY);
        console.log("Register === ", token);
        return {
            status: "success",
            user: Object.assign(Object.assign({}, registered), { password: null }),
            token,
        };
    }
    catch (error) {
        return error.message;
    }
});
exports.VeryUser = (id, user, token, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (token) {
        let newUpdate = Object.assign(Object.assign({}, user), { isVerify: true });
        let users = yield user_model_1.default.update(newUpdate, {
            where: { id },
        });
        return {
            status: "success",
            user: yield user_model_1.default.findOne({
                where: { id },
            }),
            token,
        };
    }
    else {
        return { status: "error", error: "You have not verify your account" };
    }
});
exports.loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateUser_1.validateUserLogin(user);
    if (error.email)
        return { status: "error", error: error.email };
    if (error.password)
        return { status: "error", error: error.password };
    const checkUser = yield user_model_1.default.findOne({
        email: value.email,
    });
    if (!checkUser)
        return { status: "error", error: "You are yet to register" };
    // if (!checkUser.isVerify)
    //   return { status: "error", error: "Check your mail an activate"!! };
    const validPassword = yield bcryptjs_1.default.compare(value.password, checkUser.password);
    if (!validPassword)
        return { status: "error", error: "Password is not valid" };
    try {
        const token = yield jsonwebtoken_1.default.sign(Object.assign({}, checkUser), process.env.SECRET_KEY);
        return {
            status: "success",
            user: Object.assign(Object.assign({}, checkUser._doc), { password: null }),
            token,
        };
    }
    catch (error) {
        return error.message;
    }
});
exports.loadUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    try {
        const user = yield user_model_1.default.findOne({ id });
        return { status: "success", user };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=userController.js.map