import { deleteUserById, getUsers, getUserById } from "../models/Users.js";
import { updateInfoValidation } from "../validation/user.validation.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user).end();
        }
        else {
            res.status(400).send('User not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteUserById(id);
        res.status(200).send(`User ${id} deleted`);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
export const updateUser = async (req, res) => {
    const { username, email } = req.body;
    const id = req.params.id;
    const { error } = updateInfoValidation.validate({
        username: username,
        email: email,
    });
    if (error) {
        return res.status(400).send(error.details);
    }
    try {
        const user = await getUserById(id);
        if (user) {
            user.username = username;
            user.email = email;
            user.save();
            res.status(200).json(user).end();
        }
        else {
            res.status(400).send('User not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
//# sourceMappingURL=Users.js.map