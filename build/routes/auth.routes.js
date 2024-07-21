"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const catchAsync_1 = require("../middlewares/catchAsync");
const auth_1 = require("../middlewares/auth");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router
            .route("/login")
            .post((0, catchAsync_1.catchAsync)(this.authController.login));
        this.router
            .route("/signup")
            .post((0, catchAsync_1.catchAsync)(this.authController.signup));
        this.router
            .route("/me")
            .get([auth_1.authMiddleware], (0, catchAsync_1.catchAsync)(this.authController.me));
        this.router
            .route("/refresh-token")
            .post((0, catchAsync_1.catchAsync)(this.authController.refreshToken));
        this.router
            .route("/forgot-password")
            .post((0, catchAsync_1.catchAsync)(this.authController.forgotPassword));
        this.router
            .route("/reset-password")
            .post((0, catchAsync_1.catchAsync)(this.authController.resetPassword));
        this.router
            .route("/change-password")
            .put([auth_1.authMiddleware], (0, catchAsync_1.catchAsync)(this.authController.changePassword));
    }
}
exports.default = new AuthRoutes().router;
