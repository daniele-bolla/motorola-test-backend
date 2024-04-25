import { UserModel } from "../models/Users.js";
import type { User } from "../models/Users.js";

export const getUsers = ()=> UserModel.find();
export const getUsersByEmail = (email:string)=> UserModel.findOne({email})
export const getUsersBySessionToken = (sessionToken:string)=>  UserModel.findOne({'auth.sessionToken':sessionToken})
export const getUsersById = (id:string)=> UserModel.findById(id)
export const createUser = (user:User)=> new UserModel(user).save().then((user)=>user.toObject())
export const deleteUserById = (id:string)=> UserModel.findByIdAndDelete(id)
export const updateUserById = (id:string, user:User )=> UserModel.findByIdAndUpdate(id, user)
