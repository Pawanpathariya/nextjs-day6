import Product from "@/app/model/Product";
import dbConnect from "@/app/lib/connection";
export async function POST(req) {
  try {
    await dbConnect();
    const data= await req.json();
    const {proname}=data;
    const data1=await Product.find({proname:{ $regex: proname, $options:'i'}})
    if(data1.length<1){
        return Response.json({ message: 'No product found'}, { status: 400 });
    }
    return Response.json({ message: 'Product search successfully',prod:data1 }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to Add Product' }, { status: 500 });
  }
}


