import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../../utils/redux/authSlice";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    const user = { username, password };
    const token = "dummy-token";
    dispatch(setUser(user));
    dispatch(setToken(token));
    router.push("/dashboard");
  };

  return (
    <Layout isHidden={true}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
