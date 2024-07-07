import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import { User } from "@prisma/client";

import { prismaClient } from "@/app";
import {
    BadRequestException,
    UnauthorizedException,
} from "@exceptions/error-handler";
import { RequestBody } from "@types";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAuthorizationHeader,
} from "@utils/jwt";
import { config } from "@config";
import { AUTH_ERRORS } from "@constants/message";

export default class AuthController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await prismaClient.user.findFirst({ where: { email } });
        if (user == null) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
        } else {
            const isValidPassword = compareSync(password, user.password);
            if (!isValidPassword) {
                throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
            }

            const token = await generateAccessToken(user.id);
            const refreshToken = await generateRefreshToken(req.body.id);

            res.json({ token, refreshToken });
        }
    }

    public async signup(req: Request, res: Response) {
        const { email } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });

        if (user) throw new BadRequestException(AUTH_ERRORS.EXISTED_USER);

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

    public async refreshToken(req: RequestBody<User>, res: Response) {
        const payload = await verifyAuthorizationHeader(
            req,
            config.REFRESH_TOKEN_SECRET
        );

        if (!payload)
            throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);

        const token = await generateAccessToken(req.body.id);

        const refreshToken = await generateRefreshToken(req.body.id);

        res.json({ token, refreshToken });
    }
}
