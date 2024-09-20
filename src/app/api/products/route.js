import { Product } from "@/models/Product";
import mongoose from "mongoose";


export async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
}

export async function POST(req){
    await connectToDatabase();
    const data = await req.json();
    const ProductDoc = await Product.create(data);
    return Response.json(ProductDoc);
}

export async function PUT(req){
    await connectToDatabase();
    const {_id, ...data} = await req.json();
    await Product.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET(){
    await connectToDatabase();
    return Response.json(
        await Product.find()
    );
}

export async function DELETE(req){
    await connectToDatabase();
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await product.deleteOne({_id});
  return Response.json(true);
}