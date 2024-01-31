import { createSlice } from "@reduxjs/toolkit";
import { getAuthentication } from "./actions";
import { UserAppType } from "@/types/oauthTypes";

const initialState = {
  appScreenSize: "",
  siteName: "Fund10x",
  baseURL: "https://test-server2-fasta.herokuapp.com/api",
  RequestId: "001web001web" + Math.floor(Math.random() * 10),
  secretKey: "helloworld",
  user: <UserAppType | null>null,
  token: "",
  darkMode: false,
  loginIdentity: null,
  isUserLoggedIn: false,
  loading: true,
  error: false,
  currentUserCountry: "Nigeria",
};

const authSlice = createSlice({
  name: "oauth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthentication.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.user = result?.data;
      }
    });
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
