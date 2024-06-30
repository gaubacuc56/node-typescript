import { HttpStatus } from "@constants/http";
import { HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, null, HttpStatus.BAD_REQUEST, null);
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, null, HttpStatus.NOT_FOUND, null);
    }
}
export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(message, null, HttpStatus.UNAUTHORIZED, null);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string) {
        super(message, null, HttpStatus.FORBIDDEN, null);
    }
}

export class InteralServerErrorException extends HttpException {
    constructor(message: string) {
        super(message, null, HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
}
