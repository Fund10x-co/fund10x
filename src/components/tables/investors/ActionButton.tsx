import { setConfirmPopUp } from "@/store/alertSlice/alertSlice";
import { AppDispatch } from "@/store/store";
import { investorType } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { BiShow, BiPencil, BiTrash } from "react-icons/bi";

type ActionButtonProps = {
  item: investorType;
};

const ActionButton = ({ item }: ActionButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(
      setConfirmPopUp({
        status: true,
        type: "DELETE_INVESTOR",
        title: "Delete investor",
        desc: "Are you sure you want to delete this investor?",
        payload: {
          id: item?._id,
        },
        buttonText: "Proceed",
      })
    );
  };

  const handleEdit = () => {
    router?.push(`/admin/investors/edit/${item?._id}`);
  };

  const handleView = () => {
    router?.push(`/admin/investors/view/${item?._id}`);
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
