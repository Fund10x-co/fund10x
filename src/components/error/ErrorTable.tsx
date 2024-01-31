import { getAdmins } from "@/store/adminSlice/actions";
import { getBusiness } from "@/store/businessSlice/actions";
import { getInvestors } from "@/store/investorSlice/actions";
import { AppDispatch } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";

type ErrorTableProps = {
  requestType?: string;
};

const ErrorTable = ({ requestType }: ErrorTableProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRetry = () => {
    if (requestType === "ADMINS") {
      dispatch(getAdmins(`?page=${1}&limit=${10}`));

      return;
    }
    if (requestType === "INVESTORS") {
      dispatch(getInvestors(`?page=${1}&limit=${10}`));

      return;
    }
    if (requestType === "BUSINESS") {
      dispatch(getBusiness(`?page=${1}&limit=${10}`));

      return;
    }
  };

  return (
    <div className="error_table">
      <h4>Something's wrong</h4>
      <p>We're having issue loading your requests</p>
      <button
        onClick={() => handleRetry()}
        type="button"
        className="site_button animate__animated animate__fadeInRight"
      >
        <span>Try Again</span>
      </button>
    </div>
  );
};

export default ErrorTable;
