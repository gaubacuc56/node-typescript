import { Router } from "express";
import AuthController from "../controllers/Auth.controller";

class AuthRoutes {
  router = Router();
  authController = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/login").get(this.authController.login);
  }
}

export default new AuthRoutes().router;
