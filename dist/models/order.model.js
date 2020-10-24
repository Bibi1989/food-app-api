"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OrderSchema = new Schema({
    name: {
        type: String,
        required: [true, "Username is a require field"],
        unique: true,
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
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    isPurchase: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "user",
    },
    foodId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "food",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model("order", OrderSchema);
//# sourceMappingURL=order.model.js.map