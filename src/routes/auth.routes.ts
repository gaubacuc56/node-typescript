import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { AsyncRoute } from "@middlewares/catchAsync";
import { authMiddleware } from "@middlewares/auth";
import { validate } from "@middlewares/validate";
import { authValidation } from "@validations";
class AuthRoutes extends AsyncRoute {
  public router = Router();
  private authController: AuthController;

  constructor() {
    super();
    this.authController = this.CatchAsync(new AuthController());
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router
      .route("/login")
      .post([validate(authValidation.login)], this.authController.login);

    this.router
      .route("/signup")
      .post([validate(authValidation.signup)], this.authController.signup);

    this.router
      .route("/forgot-password")
      .post(
        [validate(authValidation.forgotPassword)],
        this.authController.forgotPassword
      );

    this.router
      .route("/reset-password")
      .post(
        [validate(authValidation.resetPassword)],
        this.authController.resetPassword
      );

    this.router
      .route("/change-password")
      .put(
        [authMiddleware, validate(authValidation.changePassword)],
        this.authController.changePassword
      );

    this.router.route("/me").get([authMiddleware], this.authController.me);
    this.router.route("/refresh-token").post(this.authController.refreshToken);
  }
}

export default new AuthRoutes().router;
