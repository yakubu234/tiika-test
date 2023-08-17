import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/User";
import  handleResponse  from "../utils/response";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        handleResponse(res, {status:'error', message: "UnAuthenticated Token Required failed"} , 401);
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if (err) {
            handleResponse(res, {status:'error', message: " Token Mismatched failed"} , 403);
            return;
        }
        req.body.user = user;
        next();
    });
}

export async function authenticateUser(
    req: Request,
    res: Response
): Promise<void> {

    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (!user || !(await user.comparePassword(password))) {
            handleResponse(res, {status:'error', message: "Authentication failed"} , 401);
            return;
        }

        const accessToken = generateAccessToken(user.id, user.username); // Generate token
        
        handleResponse(res, {status:'success', message: "login successful", user,accessToken}, 200);
        
    } catch (error) {
        handleResponse(res, {status:'error', message: "Error during login."}, 500);
        return;
    }
}

export function generateAccessToken(userId: number, username: string): string {
    return jwt.sign({ id: userId, username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
}
