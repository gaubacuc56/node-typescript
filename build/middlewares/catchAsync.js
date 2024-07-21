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
exports.catchAsync = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
const message_1 = require("../constants/message");
const error_handler_1 = require("../exceptions/error-handler");
const root_1 = require("../exceptions/root");
const catchAsync = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HttpException) {
                exception = error;
            }
            else {
                exception = new error_handler_1.InternalServerErrorException(message_1.COMMON_ERRORS.SERVER_ERROR);
            }
            next(exception);
        }
    });
};
exports.catchAsync = catchAsync;
