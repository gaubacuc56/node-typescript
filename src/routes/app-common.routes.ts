import { Router } from "express";
import { AppCommonController } from "@controllers/app-common.controller";
import { catchAsync } from "@middlewares/catchAsync";

class AppCommonRoutes {
  public router = Router();
  public appCommonController = new AppCommonController();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router
      .route("/health-check")
      .get(catchAsync(this.appCommonController.healthCheck));
  }
}

export default new AppCommonRoutes().router;
