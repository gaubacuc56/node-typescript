import * as jwt from "jsonwebtoken";
import {config} from "@/config";
import {
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
} from "@constants/jwt";
import { RequestBody } from "@types";
import { UnauthorizedException } from "@exceptions/error-handler";
import { AUTH_ERRORS } from "@constants/message";

export const generateAccessToken = async (id: number) => {
    const token = jwt.sign(
        {
            userInfo: id,
        },
        config.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
    return token;
};

export const generateRefreshToken = async (id: number) => {
    const token = jwt.sign(
        {
            userInfo: id,
        },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );
    return token;
};

const verifyToken = async (token: string, type: string) => {
    return jwt.verify(token, type) as jwt.JwtPayload;
};

export const verifyAuthorizationHeader = async <T> (
    req: RequestBody<T>,
    tokenSecret: string
) => {
    const authorization = req.header("authorization");
    if (!authorization) {
        throw new UnauthorizedException(AUTH_ERRORS.UNAUTHORIZED);
    }

    const token = authorization.replace("Bearer ", "");
    if (!token) {
        throw new UnauthorizedException(AUTH_ERRORS.UNAUTHORIZED);
    }

    try {
        const payload = await verifyToken(token, tokenSecret);
        if (!payload) {
            throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
        }
        return payload;
    } catch (error) {
        throw new UnauthorizedException(AUTH_ERRORS.UNAUTHORIZED);
    }
};
