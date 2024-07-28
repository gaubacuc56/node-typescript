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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = require("bcrypt");
const crypto_1 = __importDefault(require("crypto"));
const app_1 = require("../app");
const error_handler_1 = require("../exceptions/error-handler");
const jwt_1 = require("../utils/jwt");
const _config_1 = require("../config");
const message_1 = require("../constants/message");
const send_mail_1 = require("../utils/send-mail");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield app_1.prismaClient.user.findFirst({ where: { email } });
            if (user == null) {
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.INVALID_CREDENTIALS);
            }
            else {
                const isValidPassword = (0, bcrypt_1.compareSync)(password, user.password);
                if (!isValidPassword) {
                    throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.INVALID_CREDENTIALS);
                }
                const token = yield (0, jwt_1.generateAccessToken)(user.id);
                const refreshToken = yield (0, jwt_1.generateRefreshToken)(user.id);
                res.json({ token, refreshToken });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            let user = yield app_1.prismaClient.user.findFirst({ where: { email } });
            if (user)
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.EXISTED_USER);
            user = yield app_1.prismaClient.user.create({
                data: Object.assign(Object.assign({}, req.body), { password: (0, bcrypt_1.hashSync)(req.body.password, 10) }),
            });
            res.json(user);
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(req.body);
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield (0, jwt_1.verifyAuthorizationHeader)(req, _config_1.config.REFRESH_TOKEN_SECRET);
            if (!payload)
                throw new error_handler_1.UnauthorizedException(message_1.AUTH_ERRORS.INVALID_TOKEN);
            const token = yield (0, jwt_1.generateAccessToken)(req.body.id);
            const refreshToken = yield (0, jwt_1.generateRefreshToken)(req.body.id);
            res.json({ token, refreshToken });
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield app_1.prismaClient.user.findFirst({ where: { email } });
            if (!user)
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.USER_NOT_FOUND);
            const resetKey = crypto_1.default.randomBytes(32).toString("hex") + new Date().valueOf();
            const resetKeyExpired = new Date(Date.now() + 60000); // expire in 1 minute
            yield app_1.prismaClient.user.update({
                where: { id: user.id },
                data: { resetKey, resetKeyExpired },
            });
            const resetUrl = `http://localhost:5173/auth/reset-password?resetKey=${resetKey}`;
            yield send_mail_1.transporter.sendMail({
                from: '"Toan" <thaitoan3039015@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Reset your password", // Subject line
                html: `<p>Follow this link to reset your password: \n ${resetUrl}</p>`, // html body
            });
            res.json({ message: "Password reset email sent" });
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resetKey, newPassword } = req.body;
            const user = yield app_1.prismaClient.user.findFirst({
                where: { resetKey: resetKey, resetKeyExpired: { gte: new Date() } },
            });
            if (!user) {
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.INVALID_TOKEN);
            }
            const isOldPassword = (0, bcrypt_1.compareSync)(newPassword, user.password);
            if (isOldPassword) {
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.IS_OLD_PASSWORD);
            }
            yield app_1.prismaClient.user.update({
                where: { id: user.id },
                data: {
                    password: (0, bcrypt_1.hashSync)(newPassword, 10),
                    resetKey: null,
                    resetKeyExpired: null,
                },
            });
            res.json({ message: "Password reset successful" });
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, password, oldPassword, newPassword } = req.body;
            const isOldPasswordValid = (0, bcrypt_1.compareSync)(oldPassword, password);
            if (!isOldPasswordValid) {
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.INVALID_PASSWORD);
            }
            if (oldPassword === newPassword) {
                throw new error_handler_1.BadRequestException(message_1.AUTH_ERRORS.IS_OLD_PASSWORD);
            }
            yield app_1.prismaClient.user.update({
                where: { id: id },
                data: {
                    password: (0, bcrypt_1.hashSync)(newPassword, 10),
                },
            });
            res.json({ message: "Change password successful" });
        });
    }
}
exports.AuthController = AuthController;
