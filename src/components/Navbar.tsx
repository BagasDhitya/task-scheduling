import { FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { NavbarProps } from "@/utils/interface/component";
import { RootState } from "../utils/redux/store";
import { logout } from "../utils/redux/authSlice";

const Navbar: FC<NavbarProps> = ({ isHidden }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        router.push("/auth/login");
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <nav
      className={`bg-emerald-600 p-4 text-white absolute w-screen top-0 ${
        isHidden ? "hidden" : ""
      }`}
    >
      <ul className="flex space-x-8 justify-end p-3">
        {!user ? (
          <>
            <li className="hover:bg-emerald-700 p-2 rounded">
              <Link href="/auth/register">Register</Link>
            </li>
            <li className="hover:bg-emerald-700 p-2 rounded">
              <Link href="/auth/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li className="hover:bg-emerald-700 p-2 rounded">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:bg-emerald-700 p-2 rounded">
              <Link href="/profile">Profile</Link>
            </li>
            <li className="hover:bg-emerald-700 p-2 rounded">
              <Link href="/settings">Settings</Link>
            </li>
            <li className="hover:bg-emerald-700 p-2 rounded">
              <button onClick={handleLogout}>Logout</button>
            </li>
            {user.profilePhoto && (
              <li className="ml-auto">
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
