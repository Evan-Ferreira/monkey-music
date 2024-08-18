import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';

export const loggerMiddlware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

export const setupMiddlewares = (router: any) => {
    router.use(cookieParser());
    router.use(loggerMiddlware);
};
