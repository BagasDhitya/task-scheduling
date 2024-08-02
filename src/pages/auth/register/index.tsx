import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../../utils/redux/authSlice";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = () => {
    const user = { username, password };
    const token = "dummy-token";
    dispatch(setUser(user));
    dispatch(setToken(token));
    router.push("/auth/login");
  };

  return (
    <Layout isHidden={true}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
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
        <Button onClick={handleRegister} className="w-full">
          Register
        </Button>
      </div>
    </Layout>
  );
};

export default Register;
