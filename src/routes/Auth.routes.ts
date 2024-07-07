import { Router } from "express";
import AuthController from "@controllers/Auth.controller";
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
    }
}

export default new AuthRoutes().router;
