import { InferSchemaType, model, Schema } from "mongoose";
import { required } from "zod/mini";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        
    }
}, {timestamps: true})

type User = InferSchemaType<typeof UserSchema>

const User = model<User>("User", UserSchema)
export default User;