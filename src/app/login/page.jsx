"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function page() {
  const router=useRouter()
    const [user, setuser] = useState({
      email: "",
      password: "",
    });
    const [buttonDisable, setButtonDisable] = useState(false)
    const onLogin = async () => {
      try {
       const response= await axios.post("/api/users/login",user)
       if(response){
         router.push("/profile")
       }
      } catch (error) {
        console.log("Login Failed");
      }
    };
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
          setButtonDisable(false)
        }
        else{
          setButtonDisable(true)
        }
    },[user])
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
        <h1>Login</h1>
        <hr />
        <label htmlFor="Email">Email</label>
        <input
          className="border border-cyan-700 p-2 bg-gray-50"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="Password">password</label>
        <input
          className="border border-cyan-700 p-2 bg-gray-100"
          type="text"
          id="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 bg-blue-400 text-white" onClick={onLogin}>
        {buttonDisable?"Not Login":"Login"}
        </button>
        <Link href={'/signup'}>Sign up</Link>
      </div>
    );
  }
  