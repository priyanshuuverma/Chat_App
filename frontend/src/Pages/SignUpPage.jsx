import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {Lock, Eye, EyeOff, Mail, MessageSquare, User, LockIcon, Loader, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [formdata, setformdata] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if(!formdata.fullName.trim()) return toast.error("full name is required")
    if(!formdata.email.trim()) return toast.error("email is required")
    if(!formdata.password.trim()) return toast.error("password is required")
    if(!/\S+@\S+\.\S+/.test(formdata.email)) return toast.error('invalid email format')
    if(formdata.password.length < 7) return toast.error("password must be at least 8 character");
    return true;

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success =  validateForm();
    if(success === true) signup(formdata);
  };
  return (
    <div className="min-h-screen  lg grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="test-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2" >Create Account</h1>
              <p className="text-base-content/60"> Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}  className="space-y-6" action="">
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">
                  Full Name                   
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="Priyanshu ..."
                value={formdata.fullName}
                onChange={(e) => setformdata({...formdata, fullName:e.target.value})}
                 />
              </div>
            </div>
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
                value={formdata.email}
                onChange={(e) => setformdata({...formdata, email:e.target.value})}
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
                value={formdata.password}
                onChange={(e) => setformdata({...formdata, password:e.target.value})}
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
              <button type="submit" className="btn btn-primary w-full " disabled={isSigningUp}>
                  {isSigningUp ? (
                    <>
                    <Loader2 className="size-5 animate-spin"/>
                    Loading.....
                    </>
                  ):(
                    "Create Account"
                  )}
              </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
            Already Have an account? { " "}
            <Link to="/login" className="link link-primary">
            Sign in
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
};

export default SignUpPage;
