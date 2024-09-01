import { Application } from "express";
import AuthRoutes from "./auth.routes";
import AppCommonRoutes from "./app-common.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/app", AppCommonRoutes);
    app.use("/api/auth", AuthRoutes);
  }
}
