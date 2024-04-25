import mongoose from "mongoose";

export type User = {
    username:string,
    email:string,
    auth:{
        password:string,
        salt:string,
        sessionToken?:string,
    }
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