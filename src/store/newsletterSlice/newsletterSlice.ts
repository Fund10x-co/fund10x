import { createSlice } from "@reduxjs/toolkit";
import { newsletterType, responseNewsletterWithMeta } from "@/types/types";
import { handleAxiosReduxError } from "@/utils/helpers/customFunctions";
import { getNewsletters } from "./actions";

const initialState = {
  newsletters: <newsletterType[]>[],
  newsletterLoading: false,
  newsletterError: {
    status: false,
    message: "",
  },
  newsletterCurrentPage: 1,
  newsletterTotalPages: 2,
  newsletterTotalData: 2,
  newsletterNextPage: <number | null>null,
};

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsletters.pending, (state, { payload }) => {
      state.newsletterLoading = true;
      state.newsletterError = {
        status: false,
        message: "",
      };
    });
    builder.addCase(getNewsletters.fulfilled, (state, action) => {
      state.newsletterLoading = false;
      state.newsletterError = {
        status: false,
        message: "",
      };

      console.log("payload", action?.payload);
      let data: responseNewsletterWithMeta = action?.payload;

      if (data?.error === false) {
        state.newsletters = data?.data;
        state.newsletterCurrentPage = data?.meta.page;
        state.newsletterTotalPages = data?.meta.pages;
        state.newsletterNextPage = data?.meta?.nextPage;
        state.newsletterTotalData = data?.meta?.total;

        console.log("newsletters", state.newsletters);
      } else {
        state.newsletters = [];
      }
    });
    builder.addCase(getNewsletters.rejected, (state, action) => {
      state.newsletterLoading = false;
      state.newsletterError = {
        status: true,
        message: "Error occured",
      };

      state.newsletters = [];
      console.log("error", action);
      handleAxiosReduxError(action?.payload);
    });
  },
});

// export const { setToken, setUser } = newsletterSlice.actions;

export default newsletterSlice.reducer;
