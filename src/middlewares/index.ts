import {NextFunction, Request, Response} from 'express'
import pkg from 'lodash';
import { getUserBySessionToken } from '../models/Users.js';
const { get, merge } = pkg;


export const isAuthenticated = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const sessionToken = req.cookies['MOTOROLA-COOKIE-SESSION'];
        if(!sessionToken){
            return res.send(403).send("No session found");
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.send(403).send("No user found");
        }

        merge(req, {identity:existingUser})
        return next()
    } catch (error) {
        console.error(error)        
        return res.send(400);
    }
};

export const isOwner = async (req: Request, res: Response, next:NextFunction)=> {
    try {
   
    const {id} = req.params

        const currentUserId = get(req, 'identity._id') as unknown as string;
        if (!currentUserId) {
            return res.send(403).send("No user found");
        }
        if (currentUserId.toString() !== id) {
            return res.send(403).send("No owner found");
        }
        return next();
    }
    catch (error) {
        console.error(error);
        return res.send(400);
    }
};
