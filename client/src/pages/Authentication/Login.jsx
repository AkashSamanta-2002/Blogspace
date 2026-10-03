import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from "../../store/features/user/user.thunk";
import GoogleAuthentication from '../../service/components/GoogleAuthentication'

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLoginData = (e) => {
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value})
  }

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if(response?.payload?.success) {
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border-2 rounded-2xl w-140 p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Login Into Account</h1>

        <GoogleAuthentication />

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
              onChange={handleLoginData}
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
              onChange={handleLoginData}
            />
          </fieldset>
        </div>

        <button type="submit" className="btn btn-info w-full max-w-sm text-[#fffbfb] font-semibold bg-[#422AD5]" onClick={handleLogin}>
          Login
        </button>

        <p className="text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-[#422AD5] font-semibold hover:underline hover:text-[#422AD5]/80 transition-colors"
          >
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
