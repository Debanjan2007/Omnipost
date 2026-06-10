export class ApiErrHandler extends Error {
    private statusCode: Number;
    // @ts-nocheck
    private err: any;
    // @ts-nocheck
    constructor(statusCode: Number = 500 , err: any , message: string = "Something went wrong") {
        super();
        this.stack = err.stack;
        this.statusCode = statusCode;
        this.message = message;
        this.err = err;
    }
}