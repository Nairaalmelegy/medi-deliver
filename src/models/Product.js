import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema ({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    category: {type: String},
}, {timestamps: true});

export const Product = models?.Product || model('Product', ProductSchema);