import { NextFunction, Response } from "express";
import { User } from "@prisma/client";
import { prismaClient } from "@app";
import { AUTH_ERRORS } from "@constants/message";
import { config } from "@config";
import { UnauthorizedException } from "@exceptions/error-handler";
import { RequestBody } from "@types";
import { verifyAuthorizationHeader } from "@utils/jwt";

interface IReAuthRequest<T> extends RequestBody<T> {
    body: T & User;
}

export const authMiddleware = async <T>(
    req: IReAuthRequest<T>,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = await verifyAuthorizationHeader(req, config.JWT_SECRET);
        const user = await prismaClient.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user) next();
        else req.body = { ...req.body, ...user };
        next();
    } catch (error) {
        next(new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN));
    }
};
