import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../utils/redux/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      dispatch(setToken(token));
    }
  }, [router, dispatch]);

  return <>{children}</>;
};

export default ProtectedRoute;
