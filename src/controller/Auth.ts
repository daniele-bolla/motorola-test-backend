 import  { Request, Response} from "express";
import { RegisterValidation } from "../validation/user.validation.js";
import { createUser, getUsersByEmail } from "./Users.js";
import { authentication, random } from "../helpers/index.js";

export const register = async (req: Request, res: Response) =>{
    console.log(123123)
    const {username, email, password} = req.body;
    const { error } = RegisterValidation.validate({
        username: username,
        email: email,
        password: password,
    });
    if (error) {
        return res.status(400).send(error.details);
    }
    const existingUser = await getUsersByEmail(email)
    if (existingUser) {
        return res.status(400).send("Email already registered");
    }

    const salt = random()

    try {
        const user = await createUser({
            email,
            username,
            auth:{
                salt,
                password: authentication(salt,password),
            }
            // password: await bcryptjs.hash(body.password, 10),
        });
        return res.send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
}
