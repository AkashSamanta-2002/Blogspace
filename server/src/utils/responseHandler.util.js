class ResponseHandler {
    constructor(statusCode = 200, message = "success", data = []) {
        this.success = statusCode < 400;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data
    }
}

export const responsehandler = ResponseHandler;