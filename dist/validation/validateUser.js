"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRegister = (value) => {
    const { email, phone, password } = value;
    const error = {};
    if (!email) {
        error.email = "Email field is empty";
    }
    if (!phone) {
        error.phone = "Phone Number field is empty";
    }
    if (!password) {
        error.password = "Password field is empty";
    }
    return { value, error };
};
exports.validateUserLogin = (value) => {
    const { email, password } = value;
    const error = {};
    if (!email) {
        error.email = "Email field is empty";
    }
    if (!password) {
        error.password = "Password field is empty";
    }
    return { value, error };
};
//# sourceMappingURL=validateUser.js.map