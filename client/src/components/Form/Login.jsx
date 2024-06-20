import React, { useState } from "react";
import avatarImage from "../../assets/formBg.jpg";
import logo from "../../assets/logo.png";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const header = location.pathname === "/login" ? "Sign In" : "Sign Up";
  const value = location.pathname === "/login" ? "Sign In" : "Sign Up";
  const to = location.pathname === "/login" ? "/signup" : "/login";
  const option =
    location.pathname === "/login" ? "Sign Up now." : "Sign In now.";

  const signup = location.pathname === "/signup";


  const registerUser = async()=>{
    try {
      if(!email && !password){
        console.log("all fields are required");
        return;
      }
      if(password!==confirmPassword){
        console.log("password not matched");
        return;
      }
      const user = await axios.post("http://localhost:5000/api/v1/users/signup",{email,password},{withCredentials:true});
      console.log(user);
      navigate('/');
    } catch (error) {
      console.log("error while signup",error);
    }
  }
  const loginUser =async ()=>{
    try {
      // console.log(email+" "+password);
      if(!email&&!password){
        console.log("all fields are required");
        navigate('/');
        return;
      }
      const user = await axios.post("http://localhost:5000/api/v1/users/login",{email,password},{withCredentials:true});
      if(!user?.data){
        console.log("account doesn't exist, signup first");
        navigate('/signup');
        return;
      }
      else{
        console.log(user.data);
        navigate('/');
      }
    } catch (error) {
      console.log("error while login",error);
      
    }
  }
  return (
    <div
      className="bg-cover bg-center w-full h-screen relative "
      style={{ backgroundImage: `url(${avatarImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 h-full w-full"></div>
      <div className="absolute top-0 left-0 w-60 flex items-center p-8">
        <img src={logo} alt="logo" />
      </div>
      <form className="absolute inset-0  bg-black/75 m-auto w-[450px] h-[600px] flex flex-col gap-6 px-16 py-8">
        <h1
          className=" text-white text-3xl font-bold"
          style={{ opacity: 1, important: true }}
        >
          {header}
        </h1>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="Email"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name={location.pathname === "/login" ? "Password" : "Create Password"}
        />

        {signup ? 
        <Input
         name="Confirm Password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         /> : ""}

      <Button value={value} buttonTo={"/"} onClick={signup?registerUser:loginUser} />
        {location.pathname === "/login" ? (
          <Link to={"/forgotPassword"} className="text-white text-center">
            Forgot password ?
          </Link>
        ) : (
          ""
        )}
        <div className="flex items-center text-white ">
          <input
            className="mr-2 w-4 h-4 border-none outline-none hover:cursor-pointer"
            type="checkbox"
            name="remember"
            id="remember"
          />
          <label className="cursor-pointer" htmlFor="remember">
            Remember me
          </label>
        </div>
        <div className="text-white flex items-center">
          <p className="text-gray-400 ">
            New to Netflix?{" "}
            <Link to={to} className="text-white font-semibold">
              {option}
            </Link>
          </p>
        </div>
        <p className="text-gray-400 ">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </p>
      </form>
    </div>
  );
};

export default Login;
