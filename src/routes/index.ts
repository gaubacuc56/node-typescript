import { Application } from "express";
import AuthRoutes from "./Auth.routes";

export default class Routes {
  public constructor(app: Application) {
    app.use("/api/auth", AuthRoutes);
  }
}
