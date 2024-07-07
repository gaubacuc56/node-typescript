import express, { Application, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import Routes from "../routes";
import { errorMiddleware } from "@middlewares/error";

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

export default class Server {
    constructor(app: Application) {
        this.config(app);
    }

    public config(app: Application): void {
        app.use(express.json());
        app.use(morgan("common"));
        app.use(cors());
        app.use(urlencoded({ extended: true }));
        new Routes(app);
        app.use(errorMiddleware);
    }
}
