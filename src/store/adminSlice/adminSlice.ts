import { createSlice } from "@reduxjs/toolkit";
import { getAdmins } from "./actions";
import { adminsType, responseAdminWithMeta } from "@/types/types";
import { handleAxiosReduxError } from "@/utils/helpers/customFunctions";

const initialState = {
  admins: <adminsType[]>[],
  adminsLoading: false,
  adminsError: {
    status: false,
    message: "",
  },
  adminsCurrentPage: 1,
  adminsTotalPages: 2,
  adminsTotalData: 2,
  adminsNextPage: <number | null>null,
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdmins.pending, (state, { payload }) => {
      state.adminsLoading = true;
      state.adminsError = {
        status: false,
        message: "",
      };
    });
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.adminsLoading = false;
      state.adminsError = {
        status: false,
        message: "",
      };

      // console.log("payload", action?.payload);
      let data: responseAdminWithMeta = action?.payload;

      if (data?.error === false) {
        state.admins = data?.data;
        state.adminsCurrentPage = data?.meta.page;
        state.adminsTotalPages = data?.meta.pages;
        state.adminsNextPage = data?.meta?.nextPage;
        state.adminsTotalData = data?.meta?.total;

        // console.log("admin", state.admins);
      } else {
        state.admins = [];
      }
    });
    builder.addCase(getAdmins.rejected, (state, action) => {
      state.adminsLoading = false;
      state.adminsError = {
        status: true,
        message: "Error occured",
      };

      state.admins = [];
      // console.log("error", action);
      handleAxiosReduxError(action?.payload);
    });
  },
});

// export const { setToken, setUser } = adminSlice.actions;

export default adminSlice.reducer;
