/* eslint-disable @typescript-eslint/no-explicit-any */
import { prismaClient } from "@app";
import env from "@env";
import { UnauthorizedException } from "@exceptions/error-handler";
import { User } from "@prisma/client";
import { RequestBody } from "@types";
import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: RequestBody<User>,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new UnauthorizedException("Unauthorized"));
  } else {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as any;
      const user = await prismaClient.user.findFirst({
        where: { id: payload.userId },
      });
      if (!user) next(new UnauthorizedException("Unauthorized"));
      else req.body = user;
      next();
    } catch (error) {
      next(new UnauthorizedException("Unauthorized"));
    }
  }
};
