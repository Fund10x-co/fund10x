import { createSlice } from "@reduxjs/toolkit";
import { getInvestors } from "./actions";
import { investorType, responseInvestorWithMeta } from "@/types/types";
import { handleAxiosReduxError } from "@/utils/helpers/customFunctions";

const initialState = {
  investors: <investorType[]>[],
  investorLoading: false,
  investorError: {
    status: false,
    message: "",
  },
  investorCurrentPage: 1,
  investorTotalPages: 2,
  investorTotalData: 2,
  investorNextPage: <number | null>null,
};

const investorSlice = createSlice({
  name: "investor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvestors.pending, (state, { payload }) => {
      // console.log("here 2");
      state.investorLoading = true;
      state.investorError = {
        status: false,
        message: "",
      };
    });
    builder.addCase(getInvestors.fulfilled, (state, action) => {
      state.investorLoading = false;
      state.investorError = {
        status: false,
        message: "",
      };

      // console.log("payload", action?.payload);
      let data: responseInvestorWithMeta = action?.payload;

      if (data?.error === false) {
        state.investors = data?.data;
        state.investorCurrentPage = data?.meta.page;
        state.investorTotalPages = data?.meta.pages;
        state.investorNextPage = data?.meta?.nextPage;
        state.investorTotalData = data?.meta?.total;

        // console.log("investors", state.investors);
      } else {
        state.investors = [];
      }
    });
    builder.addCase(getInvestors.rejected, (state, action) => {
      state.investorLoading = false;
      state.investorError = {
        status: true,
        message: "Error occured",
      };

      state.investors = [];
      // console.log("error", action);
      handleAxiosReduxError(action?.payload);
    });
  },
});

// export const { setToken, setUser } = investorSlice.actions;

export default investorSlice.reducer;
