/* eslint-disable react-hooks/exhaustive-deps */
import { setAlertSmallPOPUP } from "@/store/alertSlice/alertSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AlertSmallPopUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alertSmallPOPUP: modal } = useSelector(
    (state: RootState) => state.alert
  );

  const closeModal = () => {
    dispatch(
      setAlertSmallPOPUP({
        status: false,
        type: "",
        message: modal?.message,
      })
    );
  };

  useEffect(() => {
    if (modal?.status) {
      setTimeout(() => {
        closeModal();
      }, 3500);
    }
  }, [modal]);

  return (
    <div
      className={`smallPopup ${modal?.status ? "showSmallPopup" : ""} ${
        modal?.type === "error" ? "errorSmallPop" : ""
      } `}
      onClick={() => closeModal()}
    >
      <p style={{ display: "flex" }}>
        <a
          className="button btn-square rounded is-small mr-3"
          href="true"
          onClick={(e) => e.preventDefault()}
        >
          <i className="bx bxs-badge-check text-dark"></i>
        </a>
        {modal?.message}
      </p>
    </div>
  );
};

export default AlertSmallPopUp;
