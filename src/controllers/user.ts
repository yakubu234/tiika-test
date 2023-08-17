import { Request, Response } from 'express';
import { authenticateUser,generateAccessToken} from "../middleware/auth";
import { createUser} from '../models/User';
import  handleResponse  from "../utils/response";

export const register = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    try {
        const user = await createUser({ username, password });
        const accessToken = generateAccessToken(user.id, user.username); 
        handleResponse(res, {status:'success', message: 'Registration successful' ,user,accessToken}, 201);
    } catch (error) {
        console.log(JSON.stringify(error))
        handleResponse(res, {status:'error', message: "Error creating user."}, 500);
    }
};

export const login = async (req: Request, res: Response) => {
    authenticateUser(req, res);
};
