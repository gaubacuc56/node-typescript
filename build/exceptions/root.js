"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
