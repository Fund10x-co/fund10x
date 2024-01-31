"use client";

import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Image from "next/image";

const ForgotPassword = () => {
  return (
    <div className="auth-wrapper">
      <div className="d-flex flex-column align-items-center">
        <div className="auth_logo">
          <Image
            property={"false"}
            src={require("../../assets/img/logo.png")}
            alt="logo"
          />
        </div>
        <div className="auth_body animate__animated animate__bounceIn">
          <h4 className="auth_body_title">Forgot Password</h4>
          <p className="auth_body_para">
            A recovery link will be sent to your email
          </p>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
