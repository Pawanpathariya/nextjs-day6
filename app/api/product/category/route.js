import CategoryModel from "@/app/model/Category";
import dbConnect from "@/app/lib/connection";
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const {category}=data;
    const myproduct = await CategoryModel.create({category});
    return Response.json({ message: 'Category Added successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to Add Product' }, { status: 500 });
  }
}


  export async function GET(req){
    try {
      await dbConnect();
      const data= await CategoryModel.find();
      return Response.json({data})
    } catch (error) {
      return Response.json({error},{status:500})
    }
  }


