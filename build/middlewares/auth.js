"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const _app_1 = require("../app");
const message_1 = require("../constants/message");
const _config_1 = require("../config");
const error_handler_1 = require("../exceptions/error-handler");
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield (0, jwt_1.verifyAuthorizationHeader)(req, _config_1.config.JWT_SECRET);
        const user = yield _app_1.prismaClient.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user)
            next();
        else
            req.body = Object.assign(Object.assign({}, req.body), user);
        next();
    }
    catch (error) {
        next(new error_handler_1.UnauthorizedException(message_1.AUTH_ERRORS.INVALID_TOKEN));
    }
});
exports.authMiddleware = authMiddleware;
