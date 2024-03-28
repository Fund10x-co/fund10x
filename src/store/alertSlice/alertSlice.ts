import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageLoading: {
    status: false,
    message: "Please wait...",
  },
  alertModal: {
    status: false,
    type: "success",
    title: "Request successful",
    desc: "Item added",
    payload: null,
  },
  confirmPopUp: {
    status: false,
    type: "",
    title: "",
    desc: "",
    payload: <any | null>null,
    buttonText: "",
  },

  verifyPopUp: {
    status: false,
    type: "",
    title: "",
    desc: "",
    payload: <any>null,
  },

  alertSmallPOPUP: {
    status: false,
    type: "",
    message: "",
  },

  downloadModal: {
    status: false,
    type: "",
    payload: null,
  },
};

const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    setAlertPopUp: (state, { payload }) => {
      state.alertModal = payload;
    },

    setConfirmPopUp: (state, { payload }) => {
      state.confirmPopUp = payload;
    },

    setVerifyPopUp: (state, { payload }) => {
      state.verifyPopUp = payload;
    },

    setPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },

    setAlertSmallPOPUP: (state, { payload }) => {
      state.alertSmallPOPUP = payload;
    },

    setDownloadModal: (state, { payload }) => {
      state.downloadModal = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setAlertPopUp,
  setConfirmPopUp,
  setVerifyPopUp,
  setPageLoading,
  setAlertSmallPOPUP,
  setDownloadModal,
} = alertSlice.actions;

export default alertSlice.reducer;
