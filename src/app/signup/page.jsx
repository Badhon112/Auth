"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import axios from "axios";
export default function page() {
  const router=useRouter()
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false)
  const onSignup = async () => {
    try {
      const response=await axios.post("/api/users/signup",user)
      console.log("Sign up succefull",response.data);
      router.push("/login")
    } catch (error) {
      console.log("Sign up failed");
    }
  };
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
      <h1>Sign up</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="border border-cyan-700 p-2 bg-gray-50"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="User name"
      />
      <label htmlFor="Email">Email</label>
      <input
        className="border border-cyan-700 p-2 bg-gray-50"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="Password">password</label>
      <input
        className="border border-cyan-700 p-2 bg-gray-100"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button className="p-2 border border-gray-300 rounded-lg mb-4 bg-blue-400 text-white" onClick={onSignup}>
        {buttonDisable?"No signup":"Sign up"}
      </button>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}
