"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ERRORS = exports.COMMON_ERRORS = void 0;
exports.COMMON_ERRORS = {
    SERVER_ERROR: "An unexpected error occurred",
};
exports.AUTH_ERRORS = {
    UNAUTHORIZED: "Unauthorized access",
    INVALID_TOKEN: "Invalid or expired token",
    USER_NOT_FOUND: "User not found",
    MISSING_AUTH_HEADER: "Missing authorization header",
    INVALID_CREDENTIALS: "Invalid email or password",
    EXISTED_USER: "User already exists",
    IS_OLD_PASSWORD: "New password cannot be the same as the old password",
    INVALID_PASSWORD: "Invalid password",
};
