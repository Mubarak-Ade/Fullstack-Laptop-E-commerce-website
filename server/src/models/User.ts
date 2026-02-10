import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { HydratedDocument, InferSchemaType, Model, model, Schema } from "mongoose";
import env from "../env.js";

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    bio: String,
    avatar: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        selected: true,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: String,
        default: false
    }
}, {timestamps: true})
type User = InferSchemaType<typeof UserSchema>
interface UserMethods {
    getJWTToken(): string,
    comparePassword(password: string): string
}
type UserDocument = HydratedDocument<User, UserMethods>

UserSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getJWTToken = function(this: UserDocument): string {
    return jwt.sign({id: this._id, role: this.role}, env.JWT_SECRET, {expiresIn: "1d"})
}

UserSchema.methods.comparePassword = async function( this: UserDocument, password: string) {
    return await bcrypt.compare(password, this.password)
}


const User = model<User, Model<User, {}, UserMethods>>("User", UserSchema)
export default User;