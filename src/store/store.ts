import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice/authSlice";
import alertSlice from "./alertSlice/alertSlice";
import businessSlice from "./businessSlice/businessSlice";
import investorSlice from "./investorSlice/investorSlice";
import adminSlice from "./adminSlice/adminSlice";
import newsletterSlice from "./newsletterSlice/newsletterSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      oauth: authSlice,
      alert: alertSlice,
      business: businessSlice,
      investor: investorSlice,
      admins: adminSlice,
      newsletter: newsletterSlice,
    },
  });
}

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
