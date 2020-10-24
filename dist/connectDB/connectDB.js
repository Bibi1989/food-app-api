"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(() => console.log(`DB connected sucessfully!!!`))
        .catch((err) => console.log(err));
};
//# sourceMappingURL=connectDB.js.map