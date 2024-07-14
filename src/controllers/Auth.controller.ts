import { Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import { User } from "@prisma/client";
import crypto from "crypto";

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
import {
    ILoginRequest,
    ISignUpRequest,
    IForgotPasswordRequest,
    IResetPasswordRequest,
    IChangePasswordRequest,
} from "@dtos/request/auth.req";
import { transporter } from "@utils/send-mail";

export class AuthController {
    public async login(req: RequestBody<ILoginRequest>, res: Response) {
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
            const refreshToken = await generateRefreshToken(user.id);

            res.json({ token, refreshToken });
        }
    }

    public async signup(req: RequestBody<ISignUpRequest>, res: Response) {
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

    public async forgotPassword(
        req: RequestBody<IForgotPasswordRequest>,
        res: Response
    ) {
        const { email } = req.body;
        const user = await prismaClient.user.findFirst({ where: { email } });

        if (!user) throw new BadRequestException(AUTH_ERRORS.USER_NOT_FOUND);

        const resetKey =
            crypto.randomBytes(32).toString("hex") + new Date().valueOf();
        const resetKeyExpired = new Date(Date.now() + 60000); // expire in 1 minute

        await prismaClient.user.update({
            where: { id: user.id },
            data: { resetKey, resetKeyExpired },
        });

        const resetUrl = `http://localhost:6868/auth/reset-password?resetKey=${resetKey}`;

        await transporter.sendMail({
            from: '"Toan" <thaitoan3039015@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset your password", // Subject line
            html: `<p>Follow this link to reset your password: \n ${resetUrl}</p>`, // html body
        });

        res.json({ message: "Password reset email sent" });
    }

    public async resetPassword(
        req: RequestBody<IResetPasswordRequest>,
        res: Response
    ) {
        const { resetKey, newPassword } = req.body;
        const user = await prismaClient.user.findFirst({
            where: { resetKey: resetKey, resetKeyExpired: { gte: new Date() } },
        });

        if (!user) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_TOKEN);
        }

        const isOldPassword = compareSync(newPassword, user.password);

        if (isOldPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await prismaClient.user.update({
            where: { id: user.id },
            data: {
                password: hashSync(newPassword, 10),
                resetKey: null,
                resetKeyExpired: null,
            },
        });
        res.json({ message: "Password reset successful" });
    }

    public async changePassword(
        req: RequestBody<IChangePasswordRequest & User>,
        res: Response
    ) {
        const { id, password, oldPassword, newPassword } = req.body;

        const isOldPasswordValid = compareSync(oldPassword, password);

        if (!isOldPasswordValid) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_PASSWORD);
        }

        if (oldPassword === newPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await prismaClient.user.update({
            where: { id: id },
            data: {
                password: hashSync(newPassword, 10),
            },
        });

        res.json({ message: "Change password successful" });
    }
}
