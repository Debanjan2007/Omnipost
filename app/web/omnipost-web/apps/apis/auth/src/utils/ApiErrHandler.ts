export class ApiErrHandler extends Error {
    public statusCode: Number;
    // @ts-nocheck
    public err: any;
    public message: string = "Something went wrong";
    // @ts-nocheck
    constructor(statusCode: Number = 500 , err: any , message: string) {
        super();
        this.stack = err instanceof Error ? err.stack : err;
        this.statusCode = statusCode;
        this.message = message;
        this.err = err;
    }
}