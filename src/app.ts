/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import express from "express";
import { config } from "./config";
import Server from "@server/index";

const app = express();

new Server(app);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app
  .listen(config.PORT as number, function () {
    console.info(`Local is running on http://localhost:8000`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("server startup error: address already in use");
    } else {
      console.log(err);
    }
  });
