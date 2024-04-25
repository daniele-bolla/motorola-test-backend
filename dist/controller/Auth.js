import { RegisterValidation } from "../validation/user.validation.js";
import { createUser, getUserByEmail } from "../models/Users.js";
import { authentication, random } from "../helpers/index.js";
// import bcryptjs from "bcryptjs";
// import { sign } from "jsonwebtoken";
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const { error } = RegisterValidation.validate({
        username: username,
        email: email,
        password: password,
    });
    if (error) {
        return res.status(400).send(error.details);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).send("Email already registered");
    }
    const salt = random();
    try {
        const user = await createUser({
            email,
            username,
            auth: {
                salt,
                password: authentication(salt, password),
            }
            //password: await bcryptjs.hash(password, 10),
        });
        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(err);
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const { error } = RegisterValidation.validate({
        email: email,
        password: password,
    });
    if (error) {
        return res.status(400).send(error.details);
    }
    const user = await getUserByEmail(email).select('+auth.password +auth.salt');
    if (!user) {
        return res.status(400).send("No Email found");
    }
    if (user && user.auth) {
        const expectedHash = authentication(user.auth.salt, password);
        if (user.auth.password !== expectedHash) {
            return res.status(403).send("Forbidden");
        }
        const salt = random();
        user.auth.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('MOTOROLA-COOKIE-SESSION', user.auth.sessionToken, { domain: "localhost", path: '/' });
        return res.status(200).json(user).end();
    }
    // if (!(await bcryptjs.compare(password, user.password))) {
    //     return res.status(400).send({
    //         message: "Password incorrect",
    //     });
    // }
    // const payload = {
    //     id: result.id,
    //     email: result.email,
    // };
    // const token = sign(payload, process.env.SECRETE_TOKEN);
    // res.cookie("jwt", token, {
    //     httpOnly: true,
    //     maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });
    // return res.status(200).send({
    //     message: "Logged in",
    // });
    try {
    }
    catch (err) {
        return res.status(500).send(err);
    }
};
//# sourceMappingURL=Auth.js.map