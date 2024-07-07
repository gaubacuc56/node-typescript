/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { COMMON_ERRORS } from "@constants/message";
import { InternalServerErrorException } from "@exceptions/error-handler";
import { HttpException } from "@exceptions/root";
import { NextFunction, Response, Request } from "express";

export const catchAsync = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalServerErrorException(COMMON_ERRORS.SERVER_ERROR);
      }
      next(exception);
    }
  };
};
