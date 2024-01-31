"use client";

import Image from "next/image";
import LoginForm from "./forms/LoginForm";

const LoginComp = () => {
  return (
    <div className="auth-wrapper">
      <div className="d-flex flex-column align-items-center">
        <div className="auth_logo">
          <Image
            src={require("../assets/img/logo.png")}
            alt="logo"
            property={"false"}
          />
        </div>
        <div className="auth_body animate__animated animate__bounceIn">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
