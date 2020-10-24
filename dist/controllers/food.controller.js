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
const validateProject_1 = require("../validation/validateProject");
const food_model_1 = __importDefault(require("../models/food.model"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.createFood = (req, food) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateProject_1.validateProject(food);
    console.log("values === ", food);
    if (error.price)
        return { status: "error", error: error.price };
    // if (error.food_image) return { status: "error", error: error.food_image };
    try {
        if (req.files) {
            const img = yield cloudinary_1.v2.uploader.upload(req.files.image.tempFilePath, { folder: "food" }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                return result;
            });
            const foodCreated = yield food_model_1.default.create(Object.assign(Object.assign({}, food), { food_image: img.secure_url }));
            return { status: "success", data: foodCreated };
        }
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAllFoods = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield food_model_1.default.find();
        return { status: "success", data: foods };
    }
    catch (error) {
        console.log(error.message);
        return { status: "error", error: error.message };
    }
});
exports.deleteFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkExist = yield food_model_1.default.findById(id);
        if (!checkExist) {
            return {
                status: "error",
                message: "Not found",
            };
        }
        yield food_model_1.default.findByIdAndDelete(id);
        return {
            status: "success",
            message: "You have successfully delete this item",
        };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield food_model_1.default.findById(id);
        if (food)
            return { status: "success", data: food };
        return { status: "error", error: "Cant find this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.updateAFood = (id, food) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateProject_1.validateProject(food);
    if (error.name)
        return { status: "error", error: error.project_name };
    if (error.price)
        return { status: "error", error: error.project_identifier };
    if (error.food_image)
        return { status: "error", error: error.food_image };
    try {
        const checkExist = yield food_model_1.default.findById(id);
        if (checkExist) {
            const updateFood = yield food_model_1.default.findByIdAndUpdate(id, food, { new: true });
            return {
                status: "success",
                data: updateFood,
            };
        }
        return { status: "error", error: "Cant update this item" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=food.controller.js.map