import { Application } from "express";
import AuthRoutes from "./Auth.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api/auth", AuthRoutes);
    }
}
