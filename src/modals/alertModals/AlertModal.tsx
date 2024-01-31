"use client";
import { setAlertPopUp } from "@/store/alertSlice/alertSlice";
import "./alert.scss";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCheck, BiX } from "react-icons/bi";

const AlertModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alertModal } = useSelector((state: RootState) => state.alert);

  const closeModal = () => {
    dispatch(
      setAlertPopUp({
        status: false,
        type: "",
        title: "",
        desc: "",
        payload: null,
      })
    );
  };

  return (
    alertModal?.status && (
      <div className="alert-modal alertPOP">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card animate__animated animate__bounceIn">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div
              className={`alert-modal-icon ${
                alertModal.type === "success" ? "success" : "error"
              }`}
            >
              {alertModal.type === "success" ? (
                <BiCheck size={70} color="#fff" />
              ) : (
                <BiX size={70} color="#fff" />
              )}
            </div>
            <h4
              className={`${
                alertModal.type === "success" ? "success" : "error"
              }`}
            >
              {alertModal.title}
            </h4>
            <p>{alertModal.desc}</p>

            <div className="alert-modal-button">
              <button onClick={closeModal} className="site-modal-button">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertModal;
