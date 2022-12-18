import { stat } from "fs";

export class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class ServerError extends BaseError {
  constructor(message = "something happened", statusCode = 500) {
    super(message, statusCode);
  }
}

export class BadRequestError extends BaseError {
  constructor(message = "Bad request", statusCode = 400) {
    super(message, statusCode);
  }
}

export class BadGatewayError extends BaseError {
  constructor(
    message = "The server encountered a temporary error and could not complete your request",
    statusCode = 502
  ) {
    super(message, statusCode);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = "Not authorized", statusCode = 401) {
    super(message, statusCode);
  }
}

export class forbiddenError extends BaseError {
  constructor(message = "Access forbidden", statusCode = 403) {
    super(message, statusCode);
  }
}

export class expectationFailedError extends BaseError {
  constructor(message = "Expected input were not provided", statusCode = 417) {
    super(message, statusCode);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Requested resource not found", statusCode = 404) {
    super(message, statusCode);
  }
}

export class InavlidError extends BaseError {
  constructor(message = "invalid input", statusCode = 422) {
    super(message, statusCode);
  }
}

export class DuplicateError extends BaseError {
  constructor(message = "Duplicate value entered", statusCode = 406) {
    super(message, statusCode);
  }
}
