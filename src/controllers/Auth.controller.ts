import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

import { prismaClient } from "@/app";
import env from "@/env";
import { BadRequestException } from "@exceptions/handlers";

export default class AuthController {
    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const user = await prismaClient.user.findFirst({ where: { email } });
        if (user == null)
            next(new BadRequestException("Invalid username or password"));
        else {
            const isValidPassword = compareSync(password, user.password);

            if (!isValidPassword)
                next(new BadRequestException("Invalid username or password"));
            const token = jwt.sign(
                {
                    userInfo: user.id,
                },
                env.JWT_SECRET
            );

            res.json(token);
        }
    }

    public async signup(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });

        if (user) next(new BadRequestException("User already exists"));

        user = await prismaClient.user.create({
            data: {
                ...req.body,
                password: hashSync(req.body.password, 10),
            },
        });
        res.json(user);
    }
}
