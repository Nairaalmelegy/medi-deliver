import mongoose from "mongoose";
const { Schema } = mongoose;
const UserInfoSchema = new Schema({
    email: {type: String, required: true},
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
    admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = mongoose.models.UserInfo || mongoose.model('UserInfo', UserInfoSchema);