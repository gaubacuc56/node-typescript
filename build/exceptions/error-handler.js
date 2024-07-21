"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkAuthenticationRequiredException = exports.NotExtendedException = exports.LoopDetectedException = exports.InsufficientStorageException = exports.VariantAlsoNegotiatesException = exports.HttpVersionNotSupportedException = exports.GatewayTimeoutException = exports.ServiceUnavailableException = exports.BadGatewayException = exports.NotImplementedException = exports.InternalServerErrorException = exports.UnavailableForLegalReasonsException = exports.RequestHeaderFieldsTooLargeException = exports.TooManyRequestsException = exports.PreconditionRequiredException = exports.UpgradeRequiredException = exports.FailedDependencyException = exports.LockedException = exports.UnprocessableEntityException = exports.ImATeapotException = exports.ExpectationFailedException = exports.RangeNotSatisfiableException = exports.UnsupportedMediaTypeException = exports.UriTooLongException = exports.PayloadTooLargeException = exports.PreconditionFailedException = exports.LengthRequiredException = exports.GoneException = exports.ConflictException = exports.RequestTimeoutException = exports.ProxyAuthenticationRequiredException = exports.NotAcceptableException = exports.MethodNotAllowedException = exports.PaymentRequiredException = exports.InteralServerErrorException = exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.NotModifiedException = void 0;
const http_1 = require("../constants/http");
const root_1 = require("./root");
class NotModifiedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.NOT_MODIFIED, null);
    }
}
exports.NotModifiedException = NotModifiedException;
class BadRequestException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.BAD_REQUEST, null);
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.NOT_FOUND, null);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.UNAUTHORIZED, null);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.FORBIDDEN, null);
    }
}
exports.ForbiddenException = ForbiddenException;
class InteralServerErrorException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
}
exports.InteralServerErrorException = InteralServerErrorException;
class PaymentRequiredException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.PAYMENT_REQUIRED, null);
    }
}
exports.PaymentRequiredException = PaymentRequiredException;
class MethodNotAllowedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.METHOD_NOT_ALLOWED, null);
    }
}
exports.MethodNotAllowedException = MethodNotAllowedException;
class NotAcceptableException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.NOT_ACCEPTABLE, null);
    }
}
exports.NotAcceptableException = NotAcceptableException;
class ProxyAuthenticationRequiredException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.PROXY_AUTHENTICATION_REQUIRED, null);
    }
}
exports.ProxyAuthenticationRequiredException = ProxyAuthenticationRequiredException;
class RequestTimeoutException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.REQUEST_TIMEOUT, null);
    }
}
exports.RequestTimeoutException = RequestTimeoutException;
class ConflictException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.CONFLICT, null);
    }
}
exports.ConflictException = ConflictException;
class GoneException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.GONE, null);
    }
}
exports.GoneException = GoneException;
class LengthRequiredException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.LENGTH_REQUIRED, null);
    }
}
exports.LengthRequiredException = LengthRequiredException;
class PreconditionFailedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.PRECONDITION_FAILED, null);
    }
}
exports.PreconditionFailedException = PreconditionFailedException;
class PayloadTooLargeException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.PAYLOAD_TOO_LARGE, null);
    }
}
exports.PayloadTooLargeException = PayloadTooLargeException;
class UriTooLongException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.URI_TOO_LONG, null);
    }
}
exports.UriTooLongException = UriTooLongException;
class UnsupportedMediaTypeException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE, null);
    }
}
exports.UnsupportedMediaTypeException = UnsupportedMediaTypeException;
class RangeNotSatisfiableException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.RANGE_NOT_SATISFIABLE, null);
    }
}
exports.RangeNotSatisfiableException = RangeNotSatisfiableException;
class ExpectationFailedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.EXPECTATION_FAILED, null);
    }
}
exports.ExpectationFailedException = ExpectationFailedException;
class ImATeapotException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.I_AM_A_TEAPOT, null);
    }
}
exports.ImATeapotException = ImATeapotException;
class UnprocessableEntityException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.UNPROCESSABLE_ENTITY, null);
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;
class LockedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.LOCKED, null);
    }
}
exports.LockedException = LockedException;
class FailedDependencyException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.FAILED_DEPENDENCY, null);
    }
}
exports.FailedDependencyException = FailedDependencyException;
class UpgradeRequiredException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.UPGRADE_REQUIRED, null);
    }
}
exports.UpgradeRequiredException = UpgradeRequiredException;
class PreconditionRequiredException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.PRECONDITION_REQUIRED, null);
    }
}
exports.PreconditionRequiredException = PreconditionRequiredException;
class TooManyRequestsException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.TOO_MANY_REQUESTS, null);
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class RequestHeaderFieldsTooLargeException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, null);
    }
}
exports.RequestHeaderFieldsTooLargeException = RequestHeaderFieldsTooLargeException;
class UnavailableForLegalReasonsException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, null);
    }
}
exports.UnavailableForLegalReasonsException = UnavailableForLegalReasonsException;
class InternalServerErrorException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
class NotImplementedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.NOT_IMPLEMENTED, null);
    }
}
exports.NotImplementedException = NotImplementedException;
class BadGatewayException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.BAD_GATEWAY, null);
    }
}
exports.BadGatewayException = BadGatewayException;
class ServiceUnavailableException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.SERVICE_UNAVAILABLE, null);
    }
}
exports.ServiceUnavailableException = ServiceUnavailableException;
class GatewayTimeoutException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.GATEWAY_TIMEOUT, null);
    }
}
exports.GatewayTimeoutException = GatewayTimeoutException;
class HttpVersionNotSupportedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.HTTP_VERSION_NOT_SUPPORTED, null);
    }
}
exports.HttpVersionNotSupportedException = HttpVersionNotSupportedException;
class VariantAlsoNegotiatesException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.VARIANT_ALSO_NEGOTIATES, null);
    }
}
exports.VariantAlsoNegotiatesException = VariantAlsoNegotiatesException;
class InsufficientStorageException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.INSUFFICIENT_STORAGE, null);
    }
}
exports.InsufficientStorageException = InsufficientStorageException;
class LoopDetectedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.LOOP_DETECTED, null);
    }
}
exports.LoopDetectedException = LoopDetectedException;
class NotExtendedException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.NOT_EXTENDED, null);
    }
}
exports.NotExtendedException = NotExtendedException;
class NetworkAuthenticationRequiredException extends root_1.HttpException {
    constructor(message) {
        super(message, null, http_1.HttpStatus.NETWORK_AUTHENTICATION_REQUIRED, null);
    }
}
exports.NetworkAuthenticationRequiredException = NetworkAuthenticationRequiredException;
