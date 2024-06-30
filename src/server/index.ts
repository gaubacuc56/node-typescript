import express, { Application, urlencoded, json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import * as winston from "winston";

import Routes from "../routes";
import { errorMiddleware } from "@middlewares/error";

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    public config(app: Application): void {
        app.use(express.json());
        app.use(morgan("common"));
        app.use(urlencoded({ extended: true }));
        app.use(json());
        app.use(helmet());
        app.use(errorMiddleware);
    }
}

process.on("beforeExit", function (err) {
    winston.error(JSON.stringify(err));
    console.error(err);
});
