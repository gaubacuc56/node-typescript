import { RequestBody } from "@types";
import { Response } from "express";

export class AppCommonController {
  public healthCheck(_: RequestBody<undefined>, res: Response) {
    res.json("App is working");
  }
}
