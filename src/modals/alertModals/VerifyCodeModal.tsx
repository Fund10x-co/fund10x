"use client";
import {
  setAlertPopUp,
  setConfirmPopUp,
  setPageLoading,
  setVerifyPopUp,
} from "@/store/alertSlice/alertSlice";
import "./alert.scss";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { inputCodeNext } from "../../utils/helpers/globalFunc";
import axiosInstance from "@/utils/config/axios";
import { LOGIN_URL } from "@/utils/config/urlConfigs";
import { setToken, setUser } from "@/store/authslice/authSlice";
import { useRouter } from "next/navigation";

const VerifyCodeModal = () => {
  useEffect(() => {
    inputCodeNext();
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { verifyPopUp } = useSelector((state: RootState) => state.alert);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState(true);

  const [verifyCode1, setVerifyCode1] = useState("");
  const [verifyCode2, setVerifyCode2] = useState("");
  const [verifyCode3, setVerifyCode3] = useState("");
  const [verifyCode4, setVerifyCode4] = useState("");
  const [verifyCode5, setVerifyCode5] = useState("");
  const [verifyCode6, setVerifyCode6] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(
      setVerifyPopUp({
        status: false,
        type: "",
        title: "",
        desc: "",
        payload: null,
      })
    );
    clearFields();
  };

  const clearFields = () => {
    setVerifyCode1("");
    setVerifyCode2("");
    setVerifyCode3("");
    setVerifyCode4("");
    setVerifyCode5("");
    setVerifyCode6("");
    setEmptyFields(true);
    setIsLoading(false);
    setPassword("");
    setShowPassword(true);
  };

  useEffect(() => {
    if (
      verifyCode1 === "" ||
      verifyCode2 === "" ||
      verifyCode3 === "" ||
      verifyCode4 === "" ||
      verifyCode5 === "" ||
      verifyCode6 === ""
    ) {
      setEmptyFields(true);

      return;
    }

    if (verifyPopUp.type === "CONFIRM_FORGOT_PASSWORD") {
      if (password === "") {
        setEmptyFields(true);
      }
      setEmptyFields(false);
      return;
    }
    setEmptyFields(false);
  }, [
    verifyCode1,
    verifyCode2,
    verifyCode3,
    verifyCode4,
    verifyCode5,
    verifyCode6,
    password,
    verifyPopUp,
  ]);

  const handleAction = () => {
    setIsLoading(true);

    if (verifyPopUp.type === "CONFIRM_LOGIN") {
      console.log(verifyPopUp.payload);
      loginOTP();

      return;
    }
    if (verifyPopUp.type === "CONFIRM_FORGOT_PASSWORD") {
      console.log(verifyPopUp.payload);
      // forgotPasswordOTP();

      return;
    }

    // setTimeout(() => {
    //   setIsLoading(false);
    //   closeModal();
    //   dispatch(
    //     setAlertPopUp({
    //       status: true,
    //       type: "success",
    //       title: "Request successful",
    //       desc: "Item added",
    //       payload: null,
    //     })
    //   );
    // }, 3000);
  };

  const loginOTP = () => {
    let payload = {
      email: verifyPopUp?.payload?.email,
      otpId: verifyPopUp?.payload?.otpId,
      otpCode:
        verifyCode1 +
        verifyCode2 +
        verifyCode3 +
        verifyCode4 +
        verifyCode5 +
        verifyCode6,
    };

    // console.log("payload", payload);

    axiosInstance
      .post(LOGIN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      })
      .then((response: any) => {
        if (response?.data?.error === false) {
          let user = response?.data?.data;
          let meta = response?.data?.meta;

          dispatch(setToken(meta?.token));
          dispatch(setUser(user));

          console.log("meta", meta);

          document.cookie = `token=${meta?.token};max-age=${
            30 * 24 * 60 * 60
          };path=/`;
          document.cookie = `user=${JSON.stringify(user)};max-age=${
            30 * 24 * 60 * 60
          };path=/`;

          // document.cookie = `token=${meta?.token};max-age=${30 * 60};path=/`;
          // document.cookie = `user=${JSON.stringify(user)};max-age=${
          //   30 * 60
          // };path=/`;
          router.push("/admin/investors");

          setTimeout(() => {
            setIsLoading(false);
            closeModal();
          }, 1000);
        } else {
          setIsLoading(false);
          dispatch(
            setAlertPopUp({
              status: true,
              type: "error",
              title: "Error",
              desc:
                response.data.message || "Something's wrong, please try again",
              payload: null,
            })
          );
        }
        // console.log("response", response);
      })
      .catch((error) => {
        closeModal();
        console.log("error", error);
        setIsLoading(false);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Error",
            desc:
              error?.response?.data?.errors[0] ||
              "Something's wrong, please try again",
            payload: null,
          })
        );
      });

    // fetch(`${process.env.REACT_APP_BASEURL}/admin/login/otp`, {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     setIsLoading(false);
    //     closeModal();
    //     console.log(response);

    //     if (response.meta.error === false) {
    //       dispatch(
    //         setPageLoading({
    //           status: true,
    //           message: "Please wait...",
    //         })
    //       );
    //       const data = response.data;
    //       const email = response.data.email;
    //       const token = response.meta.token;

    //       if (token) {
    //         localStorage.setItem("token", token);
    //         localStorage.setItem("email", email);
    //         localStorage.setItem("avatar", data.avatarUrl);
    //         localStorage.setItem(
    //           "fullName",
    //           data.firstName + " " + data.lastName
    //         );
    //         localStorage.setItem("accountEmail", email);
    //         sessionStorage.setItem("unknownfasta", verifyModal?.adminId);
    //         if (data.superAdmin) {
    //           localStorage.setItem("unknowntype", data.superAdmin);
    //         } else {
    //           localStorage.removeItem("unknowntype");
    //         }
    //       }

    //       // db.collection("user").doc("user-info").set(response.data);
    //       localStorage.setItem("userInfo", JSON.stringify(response.data));

    //       setTimeout(() => {
    //         dispatch(getUserInfo(verifyModal?.adminId));
    //       }, 500);
    //       setTimeout(() => {
    //         // navigate("/");
    //         window.location.reload();
    //       }, 900);
    //     } else {
    //       dispatch(
    //         setAlertPopUp({
    //           status: true,
    //           type: "error",
    //           title: "Error",
    //           imgUrl: "",
    //           desc: response.meta.message,
    //           payload: null,
    //         })
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);

    //     dispatch(
    //       setAlertPopUp({
    //         status: true,
    //         type: "error",
    //         title: "Error",
    //         imgUrl: "",
    //         desc: "Something went wrong",
    //         payload: null,
    //       })
    //     );
    //   });
  };

  return (
    verifyPopUp?.status && (
      <div
        className={`alert-modal verifypinModal  ${
          verifyPopUp.type === "CONFIRM_LOGIN" && "verifypinLoginModal"
        }`}
      >
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card animate__animated animate__bounceIn">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />
            <h4>{verifyPopUp.title}</h4>
            {verifyPopUp.desc && <p> {verifyPopUp.desc}</p>}
            <br />

            <input type="email" style={{ display: "none" }} />

            <div
              className="instructionMessageInputCodes"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <input
                value={verifyCode1}
                onChange={(e) => setVerifyCode1(e.target.value)}
                type="text"
                maxLength={1}
                autoComplete="off"
                id="verifyCode1"
              />
              <input
                value={verifyCode2}
                onChange={(e) => setVerifyCode2(e.target.value)}
                type="text"
                autoComplete="off"
                maxLength={1}
                id="verifyCode2"
              />

              <input
                value={verifyCode3}
                onChange={(e) => setVerifyCode3(e.target.value)}
                type="text"
                autoComplete="off"
                maxLength={1}
                id="verifyCode3"
              />
              <input
                value={verifyCode4}
                onChange={(e) => setVerifyCode4(e.target.value)}
                type="text"
                maxLength={1}
                autoComplete="off"
                id="verifyCode4"
              />
              <input
                value={verifyCode5}
                onChange={(e) => setVerifyCode5(e.target.value)}
                type="text"
                maxLength={1}
                autoComplete="off"
                id="verifyCode5"
              />
              <input
                value={verifyCode6}
                onChange={(e) => setVerifyCode6(e.target.value)}
                type="text"
                maxLength={1}
                autoComplete="false"
                id="verifyCode6"
              />
            </div>

            {verifyPopUp.type === "CONFIRM_FORGOT_PASSWORD" && (
              <div className="form-group mt-5" style={{ width: "100%" }}>
                <label htmlFor="">New Password</label>
                <div className="password_div">
                  <input
                    value={password}
                    type={`${showPassword ? "password" : "text"}`}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*******************"
                    className="form_input"
                  />

                  <i
                    className={`bx  passwordToggle  ${
                      showPassword ? "bx-hide" : "bx-show"
                    }`}
                    onClick={() => togglePassword()}
                  ></i>
                </div>
              </div>
            )}

            <div
              className="alert-modal-button"
              style={{ width: "60%", marginTop: "42px" }}
            >
              <button
                disabled={emptyFields}
                style={{ width: "100%" }}
                onClick={() => handleAction()}
                className="site-modal-button py-3 px-4"
              >
                {isLoading === false ? (
                  <span>Verify</span>
                ) : (
                  <span
                    className="spinner spinner-border spinner-border-sm"
                    role={"status"}
                  ></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default VerifyCodeModal;
