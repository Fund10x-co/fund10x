import { setConfirmPopUp } from "@/store/alertSlice/alertSlice";
import { AppDispatch } from "@/store/store";
import { businessType } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { BiShow, BiPencil, BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";

type ActionButtonProps = {
  item: businessType;
};

const ActionButton = ({ item }: ActionButtonProps) => {
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
    <div className="column_text">
      <div className="column_text_buttons">
        <a
          href="true"
          onClick={(e) => {
            e.preventDefault();

            handleView();
          }}
        >
          View
          <BiShow size={19} color={"#6c738e"} />
        </a>
        <a
          href="true"
          onClick={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          Edit
          <BiPencil size={17} color={"#aaa53d"} />
        </a>
        <a
          href="true"
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          Delete
          <BiTrash size={15} color={"#c62929"} />
        </a>
      </div>
    </div>
  );
};

export default ActionButton;
