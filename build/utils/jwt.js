"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyAuthorizationHeader = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config");
const jwt_1 = require("../constants/jwt");
const error_handler_1 = require("../exceptions/error-handler");
const message_1 = require("../constants/message");
const generateAccessToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwt.sign({
        userInfo: id,
    }, config_1.config.JWT_SECRET, { expiresIn: jwt_1.ACCESS_TOKEN_EXPIRATION });
    return token;
});
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwt.sign({
        userInfo: id,
    }, config_1.config.REFRESH_TOKEN_SECRET, { expiresIn: jwt_1.REFRESH_TOKEN_EXPIRATION });
    return token;
});
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    return jwt.verify(token, type);
});
const verifyAuthorizationHeader = (req, tokenSecret) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.header("authorization");
    if (!authorization) {
        throw new error_handler_1.UnauthorizedException(message_1.AUTH_ERRORS.UNAUTHORIZED);
    }
    const token = authorization.replace("Bearer ", "");
    if (!token) {
        throw new error_handler_1.UnauthorizedException(message_1.AUTH_ERRORS.UNAUTHORIZED);
    }
    try {
        const payload = yield verifyToken(token, tokenSecret);
        if (!payload) {
            throw new error_handler_1.UnauthorizedException(message_1.AUTH_ERRORS.INVALID_TOKEN);
        }
        return payload;
    }
    catch (error) {
        throw new error_handler_1.UnauthorizedException(message_1.AUTH_ERRORS.UNAUTHORIZED);
    }
});
exports.verifyAuthorizationHeader = verifyAuthorizationHeader;
