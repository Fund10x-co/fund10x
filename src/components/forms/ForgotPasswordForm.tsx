/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { validEmail } from "@/utils/helpers/customFunctions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ForgotPasswordForm = () => {
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
    if (password && email === "") {
      setEmailError("email is required");
      setEmptyFields(true);
      return;
    }

    if (validEmail(email) === false) {
      setEmailError("invalid email address");
      setEmptyFields(true);
      return;
    }

    setEmailError("");

    if (email && password === "") {
      setEmptyFields(true);
      setPasswordError("Password is required");
      return;
    }

    setPasswordError("");
    setEmptyFields(false);
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
          placeholder="Enter your email"
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

      <div className="form-group  mt-5">
        <button type="submit" disabled={emptyFields} className="site_button">
          Submit
        </button>
      </div>
      <div className="form-group mt-3">
        <Link href="/login" className="has_link">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
