export const asyncHandler = async (requestHandler: unknown) => {
    return (req: unknown, res: unknown, next: unknown) => {
        // @ts-ignore
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => {
                console.log(err);
                // @ts-ignore
                next();
            })
    }
}