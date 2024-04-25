import { UserModel } from "../models/Users.js";
export const getUsers = () => UserModel.find();
export const getUsersByEmail = (email) => UserModel.findOne({ email });
export const getUsersBySessionToken = (sessionToken) => UserModel.findOne({ 'auth.sessionToken': sessionToken });
export const getUsersById = (id) => UserModel.findById(id);
export const createUser = (user) => new UserModel(user).save().then((user) => user.toObject());
export const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id, user) => UserModel.findByIdAndUpdate(id, user);
//# sourceMappingURL=Users.js.map