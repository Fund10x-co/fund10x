/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { validEmail } from "@/utils/helpers/customFunctions";
import { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useRouter, redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  setAlertPopUp,
  setPageLoading,
  setVerifyPopUp,
} from "@/store/alertSlice/alertSlice";
import { REQUEST_LOGIN_TOKEN_URL } from "@/utils/config/urlConfigs";
import axiosInstance from "@/utils/config/axios";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [emptyFields, setEmptyFields] = useState<boolean>(true);

  const [accountFirstName, setAccountFirstName] = useState<string>("");
  const [accountAvatar, setAccountAvatar] = useState<string>("");
  const [accountEmail, setAccountEmail] = useState<string>("");

  useEffect(() => {
    validateFields();
  }, [email, password, accountEmail]);

  const validateFields = () => {
    if (email === "") {
      setEmptyFields(true);
      return;
    }
    // if (password && email === "") {
    //   setEmailError("email is required");
    //   setEmptyFields(true);
    //   return;
    // }

    if (validEmail(email) === false) {
      setEmailError("invalid email address");
      setEmptyFields(true);
      return;
    }

    setEmailError("");

    // if (email && password === "") {
    //   setEmptyFields(true);
    //   setPasswordError("Password is required");
    //   return;
    // }

    // setPasswordError("");
    setEmptyFields(false);
  };

  const handleLogin = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Processing login...",
      })
    );
    let payload = {
      email: email,
    };

    axiosInstance
      .post(REQUEST_LOGIN_TOKEN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      })
      .then((response: any) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        if (response?.data?.error === false) {
          dispatch(
            setVerifyPopUp({
              status: true,
              type: "CONFIRM_LOGIN",
              title: "Confirm login token",
              desc: "An authorization token has been sent to your email",
              payload: {
                email: email,
                otpId: response?.data?.data?.otpId,
              },
            })
          );
        } else {
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
        // console.log("error", error);
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Error",
            desc: error?.message
              ? error?.message
              : error?.response?.data?.errors[0]
              ? error?.response?.data?.errors[0]
              : "Something's wrong, please try again",
            payload: null,
          })
        );
      });

    // dispatch(
    //   setVerifyPopUp({
    //     status: true,
    //     type: "CONFIRM_LOGIN",
    //     title: "Confirm login token",
    //     desc: "An authorization token has been sent to your email",
    //     payload: null,
    //     otpId: "",
    //   })
    // );
  };

  return (
    <form className="auth_form" onSubmit={() => {}}>
      {/* <div className="form-group mb-4">
        <div className="account-user-details">
          <Image
            src={require("../../assets/img/13.png")}
            alt="pics"
            width={45}
            height={45}
            style={{
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <h2>Victor</h2>
        </div>
      </div> */}

      <div className="form-group mb-4">
        <label htmlFor="">Email </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form_input"
        />
        {emailError && (
          <p className="inputError">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 20 20"
              role="presentation"
              focusable="false"
              tabIndex={-1}
              fill="red"
            >
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
            </svg>
            {emailError}
          </p>
        )}
      </div>
      {/* <div className="form-group mb-3">
        <label htmlFor="">Password</label>
        <div className="password_div">
          <input
            type={`password`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form_input"
          />
          <div className="passwordToggle">
            <BiShow />
          </div>
        </div>
        {passwordError && (
          <p className="inputError">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 20 20"
              role="presentation"
              focusable="false"
              tabIndex={-1}
              fill="red"
            >
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
            </svg>
            {passwordError}
          </p>
        )}
      </div>
      <div className="form-group">
        <Link href="/forgot-password" className="has_link">
          Forgot Password ?
        </Link>
      </div> */}

      <div className="form-group  mt-5">
        {/* <Link as={"/admin/investors"} href={"/admin/investors"}>
          <button type="submit" disabled={emptyFields} className="site_button">
            Login
          </button>
        </Link> */}
        <button
          type="submit"
          disabled={emptyFields}
          className="site_button"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
