"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: (_a = process.env.EMAIL_USER) !== null && _a !== void 0 ? _a : "thaitoan3039015@gmail.com",
        pass: (_b = process.env.EMAIL_PASS) !== null && _b !== void 0 ? _b : "cdhk eezh dnww axag",
    },
});
