import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@/utils/redux/authSlice";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { User } from "@/utils/interface/types";
import { useRouter } from "next/router";

const Register = () => {
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
    profilePhoto: "",
  });

  const [previewPhoto, setPreviewPhoto] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePhoto: reader.result as string,
        }));
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    const { username, email, password, profilePhoto } = formData;
    const user = { username, email, password, profilePhoto };
    console.log(user);
    const token = "dummy-token";
    dispatch(setUser(user));
    dispatch(setToken(token));
    router.push("/auth/login");
  };

  return (
    <Layout isHidden={true}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
        <div className="flex flex-col items-center mb-4 relative">
          <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 overflow-hidden">
            {previewPhoto ? (
              <img
                src={previewPhoto}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src="https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"
                alt="Placeholder"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <button
            className="absolute bottom-0 right-40 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            +
          </button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <Input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button onClick={handleRegister} className="w-full">
          Register
        </Button>
      </div>
    </Layout>
  );
};

export default Register;
