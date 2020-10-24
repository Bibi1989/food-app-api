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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("./userAuth");
const food_controller_1 = require("../controllers/food.controller");
const router = express_1.Router();
// route to get all projects
router.get("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const foods = yield food_controller_1.getAllFoods(id);
    res.json(foods);
}));
// route to get a single project
router.get("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const food = yield food_controller_1.getAFood(id);
    res.json(food);
}));
// route to create a project
router.post("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const project = yield food_controller_1.createFood(id, req.body);
    res.json({ data: project });
}));
router.put("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const food = yield food_controller_1.updateAFood(id, req.body);
    if (food.status === "error") {
        return res.status(404).json({ data: food });
    }
    res.json({ data: food });
}));
router.delete("/:projectId", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const project = yield food_controller_1.deleteFood(projectId);
    res.json({ data: project });
}));
exports.default = router;
//# sourceMappingURL=projects.js.map