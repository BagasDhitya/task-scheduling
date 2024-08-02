import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "../interface/types";

interface AuthState {
  user: User | null;
  token: string | null;
}

const getInitialUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: Cookies.get("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 7 });
    },
    setProfilePhoto: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profilePhoto = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      Cookies.remove("token");
    },
  },
});

export const { setUser, setToken, setProfilePhoto, logout } = authSlice.actions;
export default authSlice.reducer;
