import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/model/userModel";
// import { bcryptjs } from "bcryptjs";
connect();
export async function GET(req) {
  const alluser=await User.find();
  return NextResponse.json({alluser})
}
export async function POST(req) {
  const reqBody = await req.json();
  const { username, email, password } = reqBody;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 404 }
      );
    }
    // const salt = await bcryptjs.genSaltSync(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);
    //Create a new User
    const newuser = new User({
      username,
      email,
      password,
    });
    const saveuser = await newuser.save();
    return NextResponse.json({
      message: "User created succefully",
      success: true,
      saveuser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
