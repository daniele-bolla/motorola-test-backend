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
//# sourceMappingURL=Users.js.map