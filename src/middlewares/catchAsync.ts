/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { COMMON_ERRORS } from "@constants/message";
import { InternalServerErrorException } from "@exceptions/error-handler";
import { HttpException } from "@exceptions/root";
import { NextFunction, Response, Request } from "express";

const handleException = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      console.log("here");
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalServerErrorException(
          COMMON_ERRORS.SERVER_ERROR
        );
      }
      next(exception);
    }
  };
};

export class AsyncRoute {
  /**
   * Handling unexpected error in controller.
   */
  protected CatchAsync<T extends object>(controller: T): T {
    // Get all prototypes of the controller to access its methods
    const prototype = Object.getPrototypeOf(controller);

    Object.getOwnPropertyNames(prototype).forEach((key) => {
      // Check if the descriptor exists and its value is a function (i.e., a method)
      const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
      if (descriptor && typeof descriptor.value === "function") {
        // Wrap the method with error-handling logic and reassign it to the controller
        (controller as any)[key] = handleException(descriptor.value);
      }
    });

    return controller;
  }
}
