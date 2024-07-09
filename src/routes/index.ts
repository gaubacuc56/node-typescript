import { Application } from "express";
import AuthRoutes from "./auth.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api/auth", AuthRoutes);
    }
}
