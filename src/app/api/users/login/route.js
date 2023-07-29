import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/model/userModel";
connect();
export async function POST(req) {
  const reqbody = await req.json();
  const { email, password } = reqbody;
  try {
    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return NextResponse.json(
        { error: "User dose not exist" },
        { status: 400 }
      );
    }
    // if (existsUser.email === email && existsUser.password === password) {
    //   return NextResponse.json({
    //     message: "User Login Succefull",
    //   });
    // }
    // console.log("Error in try");
    if (existsUser.password !== password) {
      return NextResponse.json(
        { error: "User password not exist" },
        { status: 400 }
      );
    }
    const response = NextResponse.json({
      message: "Login succeful",
      success: true,
    });
    return response;
  } catch (error) {
    console.log("error");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
