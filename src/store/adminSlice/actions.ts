import { axiosAuth } from "@/utils/config/axios";
import { GET_ADMINS_URL } from "@/utils/config/urlConfigs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async (payload: any, { getState, dispatch, rejectWithValue }) => {
    let newP = payload ? payload : "";

    try {
      // Make HTTP request here instead of using useAxiosWithAuth
      const response = await axiosAuth.get(GET_ADMINS_URL + newP);
      return response.data; // Assuming response.data contains user data
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Return error data
    }
  }
);
