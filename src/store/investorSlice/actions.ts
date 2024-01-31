import { axiosAuth } from "@/utils/config/axios";
import { GET_INVESTORS_URL } from "@/utils/config/urlConfigs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getInvestors = createAsyncThunk(
  "investors/getInvestors",
  async (payload: any, { getState, dispatch, rejectWithValue }) => {
    // const baseURL = getState().oauth.baseURL;
    // const siteName = getState().oauth.siteName;
    let newP = payload ? payload : "";

    try {
      // Make HTTP request here instead of using useAxiosWithAuth
      const response = await axiosAuth.get(GET_INVESTORS_URL + newP);
      return response.data; // Assuming response.data contains user data
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Return error data
    }
  }
);
