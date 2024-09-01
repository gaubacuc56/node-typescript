import { Router } from "express";
import { AppCommonController } from "@controllers/app-common.controller";
import { AsyncRoute } from "@middlewares/catchAsync";

class AppCommonRoutes extends AsyncRoute {
  public router = Router();
  private appCommonController: AppCommonController;

  constructor() {
    super();
    this.appCommonController = this.CatchAsync(new AppCommonController());
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router
      .route("/health-check")
      .get(this.appCommonController.healthCheck);
  }
}

export default new AppCommonRoutes().router;
