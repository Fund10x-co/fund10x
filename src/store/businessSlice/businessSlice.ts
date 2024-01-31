import { createSlice } from "@reduxjs/toolkit";
import { getBusiness } from "./actions";
import { businessType, responseBusinessWithMeta } from "@/types/types";
import { handleAxiosReduxError } from "@/utils/helpers/customFunctions";

const initialState = {
  business: <businessType[]>[],
  businessLoading: false,
  businessError: {
    status: false,
    message: "",
  },
  businessCurrentPage: 1,
  businessTotalPages: 2,
  businessTotalData: 2,
  businessNextPage: <number | null>null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    // setToken: (state, { payload }) => {
    //   state.token = payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getBusiness.pending, (state, { payload }) => {
      // console.log("here 2");
      state.businessLoading = true;
      state.businessError = {
        status: false,
        message: "",
      };
    });
    builder.addCase(getBusiness.fulfilled, (state, action) => {
      state.businessLoading = false;
      state.businessError = {
        status: false,
        message: "",
      };

      // console.log("payload", action?.payload);
      let data: responseBusinessWithMeta = action?.payload;

      if (data?.error === false) {
        state.business = data?.data;
        state.businessCurrentPage = data?.meta.page;
        state.businessTotalPages = data?.meta.pages;
        state.businessNextPage = data?.meta?.nextPage;
        state.businessTotalData = data?.meta?.total;

        // console.log("business", state.business);
      } else {
        state.business = [];
      }
    });
    builder.addCase(getBusiness.rejected, (state, action) => {
      state.businessLoading = false;
      state.businessError = {
        status: true,
        message: "Error occured",
      };

      state.business = [];
      // console.log("error", action);
      handleAxiosReduxError(action?.payload);
    });
  },
});

// export const { setToken, setUser } = businessSlice.actions;

export default businessSlice.reducer;
