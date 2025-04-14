import Product from "@/app/model/Product";
import dbConnect from "@/app/lib/connection";
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    console.log(data);
    const { proname, probrand, procat, prodesc, proprice, imageurl } = data;
    const myproduct = await Product.create({
      proname,
      probrand,
      procategory:procat,
      prodesc,
      proprice,
      imageUrl:imageurl
    });
    console.log(myproduct);
    return Response.json({ message: 'Product Added successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to Add Product' }, { status: 500 });
  }
}


  export async function GET(req){
    try {
      await dbConnect();
      const data= await Product.find();
      return Response.json({data})
    } catch (error) {
      return Response.json({error},{status:500})
    }
  }


