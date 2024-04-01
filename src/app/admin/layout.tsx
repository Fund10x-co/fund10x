"use client";
import TopHeader from "@/components/header/TopHeader";
import FullPageLoading from "@/components/loading/FullPageLoading";
import SideBar from "@/components/sidebar/SideBar";
import { setToken, setUser } from "@/store/authslice/authSlice";
import { AppDispatch } from "@/store/store";
import { UserAppType } from "@/types/oauthTypes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// interface UserResponse {
//   user: {
//     user: any | null;
//     token: string;
//   } | null;
//   error: AxiosError | null;
// }

const layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     const { user, error } = await getUser();

  //     if (error) {
  //       push("/");
  //       return;
  //     }

  //     // if the error did not happen, if everything is alright
  //     setIsSuccess(true);

  //     if (user) {
  //       // console.log("user", JSON.parse(user?.user));
  //       // console.log("token", user?.token);
  //       dispatch(setToken(user?.token));
  //       dispatch(setUser(JSON.parse(user?.user)));
  //     }
  //   })();
  // }, [push]);

  // if (!isSuccess) {
  //   return <FullPageLoading />;
  // }

  return (
    <>
      <div className="app-wrapper">
        <SideBar />
        <TopHeader />
        <div className="content-body">{children}</div>
      </div>

      {/* <AllModals /> */}
    </>
  );
};

export default layout;

// async function getUser(): Promise<UserResponse> {
//   try {
//     const { data } = await axios.get("/api/auth/me");

//     return {
//       user: data,
//       error: null,
//     };
//   } catch (e) {
//     const error = e as AxiosError;

//     return {
//       user: null,
//       error,
//     };
//   }
// }
