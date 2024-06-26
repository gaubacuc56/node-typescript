import { Request, Response } from "express";
export default class AuthController {
  constructor() {}

  async login(req: Request, res: Response) {
    res.send("Login is working !");
  }
}
