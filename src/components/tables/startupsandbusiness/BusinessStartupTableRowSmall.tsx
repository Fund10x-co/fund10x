import { setConfirmPopUp } from "@/store/alertSlice/alertSlice";
import { AppDispatch } from "@/store/store";
import { businessType } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: businessType;
  // addCheckboxItems: () => {};
}

const BusinessStartupTableRowSmall = ({ index, item }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(
      setConfirmPopUp({
        status: true,
        type: "DELETE_BUSINESS",
        title: "Delete business",
        desc: "Are you sure you want to delete this business?",
        payload: {
          id: item?._id,
        },
        buttonText: "Proceed",
      })
    );
  };

  const handleEdit = () => {
    router?.push(`/admin/business/edit/${item?._id}`);
  };

  const handleView = () => {
    router?.push(`/admin/business/view/${item?._id}`);
  };

  return (
    <form className="site-form-view">
      <div className="site-user-details">
        <div className="site-user-details-items">
          <p>ID</p>
          <p>{item?._id}</p>
        </div>

        <div className="site-user-details-items">
          <p>Name</p>
          <p>{item?.firstName + " " + item?.lastName}</p>
        </div>
        <div className="site-user-details-items">
          <p>Work email</p>
          <p>{item?.email || "---"} </p>
        </div>

        <div className="site-user-details-items">
          <p>Firm name</p>
          <p>{item?.businessName || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Business type</p>
          <p>{item?.businessType || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Job title</p>
          <p>{item?.jobTitle || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Investment stage</p>
          <p>{item?.investmentStage || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Business website</p>
          <p>{item?.businessWebsite || "---"} </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <ActionButton item={item} />
        </div>
      </div>
    </form>
  );
};

export default BusinessStartupTableRowSmall;
