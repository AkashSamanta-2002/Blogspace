import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux'
import { googleAuthenticationThunk } from '../../store/features/user/user.thunk'
import { useNavigate } from "react-router-dom";

const GoogleAuthentication = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuthentication = async () => {
    const googleResponse = await signInWithPopup(auth, provider);
    const {displayName, email, photoURL} = googleResponse.user;
    
    const response = await dispatch(googleAuthenticationThunk({name: displayName, email, avatar: photoURL}))
    if(response?.payload?.success) {
      navigate('/')
    }
  };

  return (
    <div>
      {/* Google */}
      <button
        className="btn bg-white text-black border-[#e5e5e5]"
        onClick={handleGoogleAuthentication}
      >
        <FcGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuthentication;
