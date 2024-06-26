import express from "express";
import env from "./env";
import Server from "./server";

const app = express();

new Server(app);

app
  .listen(env.PORT as number, "localhost", function () {
    console.info(`Server running on : http://localhost:${env.PORT}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("server startup error: address already in use");
    } else {
      console.log(err);
    }
  });
