export class ApiResHandler {
    private statusCode: Number;
    private message: string;
    private data: unknown
    constructor(statusCode: Number , data: unknown , message: string ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}