"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const router = useRouter();

  return (
    <div className="auth-wrapper">
      <div className="auth_logo">
        <Image
          property={"false"}
          src={require("../assets/img/logo.png")}
          alt="logo"
        />
      </div>
      <form className="auth_form animate__animated animate__fadeInLeft">
        <div className="form-group">
          <Image
            src={require("../assets/img/bg-43.png")}
            alt="logo"
            width={180}
            height={300}
            property={"false"}
          />
          <div className="auth_body">
            <h4 className="auth_body_title">Page Not Found</h4>
            <p className="mt-3">
              Looks like we could not find the page you are requesting. Feel
              free to ask and open a support request.
            </p>
            <br />
          </div>

          <button
            type="button"
            className="site_button"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Error;
