import { Response } from "express";

export class AppCommonController {
  public healthCheck(_req: Request, res: Response) {
    res.json("App is working");
  }
}
