"use client";
import React from "react";
import AlertModal from "./alertModals/AlertModal";
import ConfirmModal from "./alertModals/ConfirmModal";
import VerifyCodeModal from "./alertModals/VerifyCodeModal";
import PageLoading from "@/components/loading/PageLoading";
import AlertSmallPopUp from "./alertModals/AlertSmallPopUp";
import DownloadModal from "./alertModals/DownloadModal";

const AllModals = () => {
  return (
    <>
      <AlertSmallPopUp />
      <AlertModal />
      <DownloadModal />
      <ConfirmModal />
      <VerifyCodeModal />

      <PageLoading />
    </>
  );
};

export default AllModals;
