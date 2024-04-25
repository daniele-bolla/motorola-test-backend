import mongoose from "mongoose";

export type User = {
    username:string,
    email:string,
    auth:{
        password:string,
        salt:string,
        sessionToken?:string,
    }
    password?:string,

}

const UserSchema = new mongoose.Schema({
    username:{type:String, require:true},
    email:{type:String, require:true},
    auth:{
        password:{type:String, require:true, select:false},
        salt:{type:String,   select:false},
        sessionToken:{type:String, require:true, select:false},
    }
})

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = ()=> UserModel.find();
export const getUserByEmail = (email:string)=> UserModel.findOne({email})
export const getUserBySessionToken = (sessionToken:string)=>  UserModel.findOne({'auth.sessionToken':sessionToken})
export const getUserById = (id:string)=> UserModel.findById(id)
export const createUser = (user:User)=> new UserModel(user).save().then((user)=>user.toObject())
export const deleteUserById = (id:string)=> UserModel.findByIdAndDelete(id)
export const updateUserById = (id:string, user:User )=> UserModel.findByIdAndUpdate(id, user)