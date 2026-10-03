import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { updateUserProfileThunk } from "../../store/features/user/user.thunk";
import defaultAvatar from "../../assets/images.png";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(
    userProfile?.avatar ||
      defaultAvatar,
  );
  const [formData, setFormData] = useState({
    name: userProfile?.name,
    email: userProfile?.email,
    avatar: userProfile?.avatar,
    bio: userProfile?.bio || "",
    password: "",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateForm = () => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    data.append("password", formData.password);

    if (formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    // Dispatch here
    dispatch(updateUserProfileThunk(data));
  };

  return (
    <div className="border max-w-[60em] flex-1 m-auto mt-10 mb-10 p-4 rounded-xl">
      {/* Avatar */}
      <div className="flex justify-center">
        <label
          htmlFor="avatar"
          className="relative w-32 h-32 cursor-pointer group block"
        >
          <img
            src={preview}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border"
          />

          {/* Overlay */}
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <FaCamera className="text-white text-3xl" />
          </div>
        </label>

        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      {/* Name */}
      <div className="w-full max-w-sm m-auto">
        <fieldset className="fieldset">
          <label className="label" htmlFor="name">
            <span>Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input w-full"
            value={formData?.name}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      {/* Email */}
      <div className="w-full max-w-sm m-auto">
        <fieldset className="fieldset">
          <label className="label" htmlFor="email">
            <span>Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input w-full"
            value={formData?.email}
            onChange={handleChange}
            readOnly
          />
        </fieldset>
      </div>

      {/* Bio */}
      <div className="w-full max-w-sm m-auto">
        <fieldset className="fieldset">
          <label className="label" htmlFor="bio">
            <span>Bio</span>
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"  
            className="w-full overflow-y-auto input h-20 text-wrap"
            placeholder="bio"
            value={formData?.bio || ""}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      {/* Password */}
      <div className="w-full max-w-sm m-auto">
        <fieldset className="fieldset">
          <label className="label" htmlFor="password">
            <span>New Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input w-full"
            placeholder="New Password"
            onChange={handleChange}
          />
        </fieldset>

        <button className="btn btn-primary w-full" onClick={handleUpdateForm}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
