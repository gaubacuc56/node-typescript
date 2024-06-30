import { Router } from "express";
import AuthController from "@controllers/Auth.controller";

class AuthRoutes {
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.route("/login").post(this.authController.login);
        this.router.route("/signup").post(this.authController.signup);
    }
}

export default new AuthRoutes().router;
