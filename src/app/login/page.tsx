"use client";

import LoginComp from "@/components/LoginComp";
import OauthWrapper from "@/components/wrapper/OauthWrapper";

const Login = () => {
  return (
    <OauthWrapper>
      <LoginComp />
    </OauthWrapper>
  );
};

export default Login;
