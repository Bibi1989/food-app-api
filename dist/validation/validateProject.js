"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = (value) => {
    const { name, price, food_image } = value;
    const error = {};
    if (!name) {
        error.name = "title field is empty";
    }
    if (!price) {
        error.price = "Price field is empty";
    }
    if (!food_image) {
        error.food_image = "Image field is empty";
    }
    return { value, error };
};
//# sourceMappingURL=validateProject.js.map