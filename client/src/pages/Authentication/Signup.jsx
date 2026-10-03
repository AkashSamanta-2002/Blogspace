import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { registerUserThunk } from "../../store/features/user/user.thunk";
import GoogleAuthentication from "../../service/components/GoogleAuthentication";
import defaultAvatar from "../../assets/images.png";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: defaultAvatar
  });

  const handleSignupData = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = async () => {
    const {name, email, password, confirmPassword, avatar} = signupData;
    
    if(password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return;
    }

    const response = await dispatch(registerUserThunk({name, email, password, avatar}));
    if(response?.payload?.success) {
      navigate('/')
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border-2 rounded-2xl w-140 p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Create Account</h1>

        {/* Google Signup */}
        <GoogleAuthentication />

        {/* Name */}
        <div className="w-full max-w-sm">
          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              <CiUser />
              <span>Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input w-full"
              placeholder="Name"
              onChange={handleSignupData}
            />
          </fieldset>
        </div>

        {/* Email */}
        <div className="w-full max-w-sm">
          <fieldset className="fieldset">
            <label className="label" htmlFor="email">
              <HiOutlineMail />
              <span>Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input w-full"
              placeholder="abc@gmail.com"
              onChange={handleSignupData}
            />
          </fieldset>
        </div>

        {/* Password */}
        <div className="w-full max-w-sm">
          <fieldset className="fieldset">
            <label className="label" htmlFor="password">
              <FaKey />
              <span>Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input w-full"
              placeholder="Password"
              onChange={handleSignupData}
            />
          </fieldset>
        </div>

        {/* Confirm Password */}
        <div className="w-full max-w-sm">
          <fieldset className="fieldset">
            <label className="label" htmlFor="confirm-password">
              <FaKey />
              <span>Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              className="input w-full"
              placeholder="Confirm Password"
              onChange={handleSignupData}
            />
          </fieldset>
        </div>

        <button type="submit" className="btn btn-info w-full max-w-sm text-[#fffbfb] bg-[#422AD5] font-semibold" onClick={handleSignup}>
          Signup
        </button>

        <p className="text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-[#422AD5] font-semibold hover:underline hover:text-[#422AD5]/80 transition-colors"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
