import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { catchAsync } from "@middlewares/catchAsync";
import { authMiddleware } from "@middlewares/auth";
class AuthRoutes {
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router
            .route("/login")
            .post(catchAsync(this.authController.login));
        this.router
            .route("/signup")
            .post(catchAsync(this.authController.signup));
        this.router
            .route("/me")
            .get([authMiddleware], catchAsync(this.authController.me));
        this.router
            .route("/refresh-token")
            .post(catchAsync(this.authController.refreshToken));
        this.router
            .route("/forgot-password")
            .post(catchAsync(this.authController.forgotPassword));
        this.router
            .route("/reset-password")
            .post(catchAsync(this.authController.resetPassword));
        this.router
          .route("/change-password")
          .put(catchAsync(this.authController.changePassword));
    }
}

export default new AuthRoutes().router;
