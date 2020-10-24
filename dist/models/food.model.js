"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const FoodSchema = new Schema({
    name: {
        type: String,
        required: [true, "Username is a require field"],
    },
    categories: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    food_image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model("food", FoodSchema);
//# sourceMappingURL=food.model.js.map