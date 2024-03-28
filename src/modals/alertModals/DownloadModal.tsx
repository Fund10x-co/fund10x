"use client";
import {
  setAlertPopUp,
  setConfirmPopUp,
  setDownloadModal,
} from "@/store/alertSlice/alertSlice";
import "./alert.scss";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DownloadModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { downloadModal: modal } = useSelector(
    (state: RootState) => state.alert
  );

  const [isLoading, setIsLoading] = useState(false);

  const [hrefLink, setHrefLink] = useState("");

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(
      setDownloadModal({
        status: false,
        type: "",
        payload: null,
      })
    );
    setIsLoading(false);
    setHrefLink("");
  };

  useEffect(() => {
    if (modal?.status) {
      if (modal?.payload) {
        setHrefLink(modal?.payload);

        console.log("payload", modal?.payload);
      }
    }
  }, [modal]);

  const handleAction = () => {};

  return (
    modal?.status && (
      <div className="alert-modal alertPOP">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card animate__animated animate__bounceIn">
          <div className="alert-modal-header">
            <h4>DownLoad </h4>
          </div>
          <div className="alert-modal-body modalbody2">
            <br />
            <br />
            <br />
            <div className="text-center">
              <a
                target="_blank"
                href={hrefLink}
                rel="noopener noreferrer"
                className="site-modal-button px-4 py-2"
              >
                Download
              </a>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    )
  );
};

export default DownloadModal;
