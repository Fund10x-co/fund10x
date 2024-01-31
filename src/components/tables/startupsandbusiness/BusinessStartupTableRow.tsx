import {
  setAlertPopUp,
  setConfirmPopUp,
  setVerifyPopUp,
} from "@/store/alertSlice/alertSlice";
import { AppDispatch } from "@/store/store";
import { businessType } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: businessType;
  selectedItems: businessType[];
  addCheckboxItems: (item: businessType) => void;
}
const BusinessStartupTableRow = ({
  index,
  item,
  addCheckboxItems,
  selectedItems,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isSelected = () => {
    let selected = selectedItems?.find((newItem) => newItem?._id === item?._id);
    return !!selected;
  };

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
    // dispatch(
    //   setAlertPopUp({
    //     status: true,
    //     type: "error",
    //     title: "Request successful",
    //     desc: "Item added",
    //     payload: null,
    //   })
    // );

    // dispatch(
    //   setVerifyPopUp({
    //     status: true,
    //     type: "CONFIRM_LOGIN",
    //     title: "Confirm login token",
    //     desc: "An authorization token has been sent to your email",
    //     payload: null,
    //     otpId: "",
    //   })
    // );
  };

  const handleView = () => {
    router?.push(`/admin/business/view/${item?._id}`);
  };
  return (
    <tr>
      <td>
        <div className="width_img">
          <input
            type="checkbox"
            checked={isSelected()}
            onChange={() => addCheckboxItems(item)}
          />
          <span>{item?._id?.slice(0, 8)}...</span>
        </div>
      </td>
      {/* <td></td> */}
      <td>{item?.firstName + " " + item?.lastName}</td>
      {/* <td>{item?.email}</td> */}
      <td>{item?.businessName}</td>
      <td>{item?.businessType}</td>
      {/* <td>{item?.investmentStage}</td>
      <td>{item?.country}</td>
      <td>{item?.businessWebsite}</td> */}
      <td>
        <ActionButton item={item} />
      </td>
    </tr>
  );
};

export default BusinessStartupTableRow;
