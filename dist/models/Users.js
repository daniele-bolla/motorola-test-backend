import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    auth: {
        password: { type: String, require: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, require: true, select: false },
    }
});
export const UserModel = mongoose.model('User', UserSchema);
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken) => UserModel.findOne({ 'auth.sessionToken': sessionToken });
export const getUserById = (id) => UserModel.findById(id);
export const createUser = (user) => new UserModel(user).save().then((user) => user.toObject());
export const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id, user) => UserModel.findByIdAndUpdate(id, user);
//# sourceMappingURL=Users.js.map