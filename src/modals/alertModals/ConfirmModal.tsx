"use client";
import { setAlertPopUp, setConfirmPopUp } from "@/store/alertSlice/alertSlice";
import "./alert.scss";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAuth } from "@/utils/config/axios";
import {
  GET_ADMINS_URL,
  GET_BUSINESS_URL,
  GET_INVESTORS_URL,
} from "@/utils/config/urlConfigs";
import { getBusiness } from "@/store/businessSlice/actions";
import { getInvestors } from "@/store/investorSlice/actions";
import { getAdmins } from "@/store/adminSlice/actions";

const ConfirmModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { confirmPopUp: modal } = useSelector(
    (state: RootState) => state.alert
  );
  const { businessCurrentPage: page } = useSelector(
    (state: RootState) => state.business
  );

  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(
      setConfirmPopUp({
        status: false,
        type: "",
        title: "",
        desc: "",
        payload: null,
        buttonText: "",
      })
    );
    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (modal?.status === true) {
  //     console.log("modalpayloadId", modal?.payload);
  //   }
  // }, [modal]);

  const handleAction = () => {
    setIsLoading(true);

    if (modal?.type === "DELETE_BUSINESS") {
      handleDeleteBusiness(modal?.payload?.id);

      return;
    }

    if (modal?.type === "DELETE_INVESTOR") {
      handleDeleteInvestors(modal?.payload?.id);

      return;
    }

    if (modal?.type === "DELETE_ADMINS") {
      handleDeleteAdmin(modal?.payload?.id);

      return;
    }

    // setTimeout(() => {
    //   setIsLoading(false);
    //   closeModal();
    //   dispatch(
    //     setAlertPopUp({
    //       status: true,
    //       type: "success",
    //       title: "Request successful",
    //       desc: "Item added",
    //       payload: null,
    //     })
    //   );
    // }, 3000);
  };

  const handleDeleteBusiness = async (id: any) => {
    try {
      const response = await axiosAuth.delete(GET_BUSINESS_URL + `?ids=${id}`);
      console.log("response", response);

      setIsLoading(false);

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Business Deleted",
            desc: "Business has been successfully deleted!",
            payload: null,
          })
        );

        dispatch(getBusiness(`?page=${page}&limit=${10}`));
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Business Not Added",
            desc: "Error occurred while deleting business",
            payload: null,
          })
        );
      }

      closeModal();
    } catch (error: any) {
      setIsLoading(false);
      dispatch(
        setAlertPopUp({
          status: true,
          type: "error",
          title: "Error",
          desc:
            error?.response?.data?.errors[0] ||
            "Something's wrong, please try again",
          payload: null,
        })
      );

      closeModal();
    }
  };

  const handleDeleteInvestors = async (id: any) => {
    try {
      const response = await axiosAuth.delete(GET_INVESTORS_URL + `?ids=${id}`);

      setIsLoading(false);

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Investor Deleted",
            desc: "Investor has been successfully deleted!",
            payload: null,
          })
        );

        dispatch(getInvestors(`?page=${page}&limit=${10}`));
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Investor Not Added",
            desc: "Error occurred while deleting Investor",
            payload: null,
          })
        );
      }

      closeModal();
    } catch (error: any) {
      setIsLoading(false);
      dispatch(
        setAlertPopUp({
          status: true,
          type: "error",
          title: "Error",
          desc:
            error?.response?.data?.errors[0] ||
            "Something's wrong, please try again",
          payload: null,
        })
      );

      closeModal();
    }
  };

  const handleDeleteAdmin = async (id: any) => {
    try {
      const response = await axiosAuth.delete(GET_ADMINS_URL + `/${id}`);

      setIsLoading(false);

      // console.log("response", response);

      if (response?.status === 204) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Admin Deleted",
            desc: "Admin has been successfully deleted!",
            payload: null,
          })
        );

        dispatch(getAdmins(`?page=${page}&limit=${10}`));
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Admin Not Deleted",
            desc: "Error occurred while deleting this Admin",
            payload: null,
          })
        );
      }

      closeModal();
    } catch (error: any) {
      setIsLoading(false);
      dispatch(
        setAlertPopUp({
          status: true,
          type: "error",
          title: "Error",
          desc:
            error?.response?.data?.errors[0] ||
            "Something's wrong, please try again",
          payload: null,
        })
      );

      closeModal();
    }
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card animate__animated animate__bounceIn">
          <div className="alert-modal-header">
            <h4>{modal.title}</h4>
          </div>
          <div className="alert-modal-body modalbody2">
            <br />
            {modal.desc && <p> {modal.desc}</p>}
            <br />

            <div className="alert-modal-button">
              <button
                onClick={() => {
                  closeModal();
                }}
                className="btn px-4 cancelBtn"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction()}
                className="site-modal-button px-4"
              >
                {isLoading === false ? (
                  <span>{modal.buttonText}</span>
                ) : (
                  <span
                    className="spinner spinner-border spinner-border-sm"
                    role={"status"}
                  ></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
