import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@/utils/redux/authSlice";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (
        user.username === credentials.username &&
        user.password === credentials.password
      ) {
        const token = "dummy-token";
        dispatch(setUser(user));
        dispatch(setToken(token));
        router.push("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    } else {
      alert("No user found. Please register first.");
    }
  };

  return (
    <Layout isHidden={true}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <Input
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <Input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </Layout>
  );
};

export default Login;
