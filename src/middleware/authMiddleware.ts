import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
}

export const authMiddleware = (
    req: Request & {user?: JwtPayload},
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.startsWith(`Bearer`)) {
        res.status(401).json({ message: `Unauthorized`});
        return;
    };

    const token = authHeader.split(` `)[1];

    if (!token) {
        res.status(404).json({ message: `Token missing`});
        return;
    };

    try {
        const decoded = Jwt.verify (
            token,
            process.env.JWT_SECRET as string
        );

        if (typeof decoded === "string") {
            res.status(401).json({ message: `Invalid token`});
            return;
        };

        req.user = decoded as JwtPayload;

        next();
    } catch (error) {
        res.status(401).json({ message: `Invalid token`});
    };
};

export default authMiddleware