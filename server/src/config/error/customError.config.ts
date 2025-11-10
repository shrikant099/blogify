import { ApiError } from "../../common/utils/apiError";


export class BadRequestError extends ApiError {
    constructor(message = "Bad request") {
        super(400, message)
    }
}

export class NotFoundError extends ApiError {
    constructor(message = "Resource not found") {
        super(404, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized access") {
        super(401, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}

export class ServerRespopnseError extends ApiError {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}