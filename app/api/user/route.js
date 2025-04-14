
import User from "@/app/model/User";
import dbConnect from "@/app/lib/connection";
import bcrypt from 'bcrypt'
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const {name,email,password}=data;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({
    name:name,
    email:email,
    password:hashedPassword
  })
   return Response.json({ message: 'User Register successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to Register' }, { status: 500 });
  }
}
