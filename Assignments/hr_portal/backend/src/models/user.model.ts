import {Schema, model} from 'mongoose'


export interface UserType{
    username: string,
    email: string,
    password:string,
    role: "Admin" | "Editor" | "Viewer"
}

const UserSchema = new Schema<UserType>({
    username:{type:String, required:true, minlength:3, maxlength:20},
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    role: {type:String, enum: ["Admin", "Editor", "Viewer"], default:'Admin'}
})


export const UserModel = model<UserType>("User", UserSchema)