import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

import { prismaClient } from "@/app";
import env from "@/env";
import { BadRequestException } from "@exceptions/error-handler";
import { RequestBody } from "@types";
import { User } from "@prisma/client";

export default class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (user == null) {
      throw new BadRequestException("Invalid username or password");
    } else {
      const isValidPassword = compareSync(password, user.password);
      if (!isValidPassword) {
        throw new BadRequestException("Invalid username or password");
      }

      const token = jwt.sign(
        {
          userInfo: user.id,
        },
        env.JWT_SECRET
      );

      res.json({ token });
    }
  }

  public async signup(req: Request, res: Response) {
    const { email } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) throw new BadRequestException("User already exists");

    user = await prismaClient.user.create({
      data: {
        ...req.body,
        password: hashSync(req.body.password, 10),
      },
    });
    res.json(user);
  }

  public async me(req: RequestBody<User>, res: Response) {
    res.json(req.body);
  }
}
