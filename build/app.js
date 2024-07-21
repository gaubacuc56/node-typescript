"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_1 = __importDefault(require("./server/index"));
const app = (0, express_1.default)();
new index_1.default(app);
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
app.listen(config_1.config.PORT, function () {
    console.info(`Server running on : http://localhost:${config_1.config.PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("server startup error: address already in use");
    }
    else {
        console.log(err);
    }
});
