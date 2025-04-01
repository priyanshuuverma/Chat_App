import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff,  Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import AuthImagePattern from '../Components/AuthImagePattern';
import {Link} from "react-router-dom"
const LoginPage = () => {

  const [showpassword, setshowpassword] = useState(false);
  const [formData, setformData] = useState({
    email:"",
    password:"",
  });
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="min-h-screen  lg grid-cols-2 mx-auto  flex-col">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="test-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2" >Log In</h1>
              <p className="text-base-content/60"> Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}  className="space-y-6" action="">
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">
                  Email                  
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="Priyanshu@gmail.com"
                value={formData.email}
                onChange={(e) => setformData({...formData, email:e.target.value})}
                 />
              </div>
              </div>
              <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">
                  Password                  
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input type={showpassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="......."
                value={formData.password}
                onChange={(e) => setformData({...formData, password:e.target.value})}
                 />
                 <button className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 type="button"
                 onClick={() => setshowpassword(!showpassword)}>
                  {showpassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40"/>
                  )}
                 </button>
              </div>
              </div>
              <button type="submit" className="btn btn-primary w-full " disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                    <Loader2 className="size-5 animate-spin"/>
                    Loading.....
                    </>
                  ):(
                    "Logg In"
                  )}
              </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
            Don't Have Account ? { " "}
            <Link to="/signup" className="link link-primary">
            Create Account
            </Link>
            </p>
          </div>
        </div> 
      </div>
      {/* right side */}
      <AuthImagePattern 
      title="Join our Community"
      subtitle="Connect with Friends, share moments, and Stay in touch with your loved ones."
      />
    </div>
  );
}

export default LoginPage