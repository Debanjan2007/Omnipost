import type { Request, Response, NextFunction } from 'express';
import { ApiErrHandler } from './ApiErrHandler'

export const globalErrHandler = (err: unknown , req: Request , res: Response , next: NextFunction) => {
    console.log(`💥 error caught: ${err instanceof Error ? err.stack : err}`);
    res
        // @ts-ignore
        .status(err.statusCode | 500)
        .json(
        // @ts-ignore
        new ApiErrHandler(err.statusCode | 500 , err instanceof Error ? err : null , err instanceof Error ? err.message : "Something went wrong")
    )
}