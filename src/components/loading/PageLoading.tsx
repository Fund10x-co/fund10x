"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const PageLoading = () => {
  const { pageLoading } = useSelector((state: RootState) => state.alert);

  return (
    pageLoading?.status && (
      <div className="page_processing_modal">
        <div className="lds-spinner">
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
        {pageLoading.message && <p>{pageLoading.message}</p>}
      </div>
    )
  );
};

export default PageLoading;
