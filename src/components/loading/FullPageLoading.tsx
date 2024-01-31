"use client";
import React from "react";

const FullPageLoading = () => {
  return (
    <div className="full_page_processing">
      <div className="lds-spinner lds-spinner2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p style={{ marginTop: 50 }}>Loading</p>
    </div>
  );
};

export default FullPageLoading;
