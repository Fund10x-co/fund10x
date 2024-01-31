import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthentication = createAsyncThunk(
  "oauth/getAuthentication",
  async (payload, { getState, dispatch }) => {
    const baseURL = getState().oauth.baseURL;
    const siteName = getState().oauth.siteName;

    let newPayload = {
      siteName: siteName,
    };

    return fetch(`${baseURL}/v1.0/Authenticate/authenticateEndpoints`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newPayload),
    }).then((res) => {
      return res.json();
    });
  }
);
