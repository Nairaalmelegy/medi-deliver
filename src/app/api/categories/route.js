import { Category } from "@/models/Category";

import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure database connection
    
    const { name } = await req.json();
    
    // Validate the category name
    if (!name) {
      return new Response(JSON.stringify({ error: 'Category name is required' }), { status: 400 });
    }

    // Create a new category
    const categoryDocs = await Category.create({ name });
    
    // Return the created category in response
    return new Response(JSON.stringify(categoryDocs), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create category' }), { status: 500 });
  }
}

export async function PUT(req){
    const {_id, name} = await req.json();
    await Category.updateOne({_id}, {name});
    return Response.json(true);
}

export async function GET(){
    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req){
  await connectToDatabase();
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await Category.deleteOne({_id});
  return Response.json(true);
}
