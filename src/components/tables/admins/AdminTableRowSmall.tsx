import { adminsType } from "@/types/types";
import React from "react";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: adminsType;
  // addCheckboxItems: () => {};
}

const AdminTableRowSmall = ({ index, item }: Props) => {
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
          <p>Email</p>
          <p>{item?.email || "---"} </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <ActionButton item={item} />
        </div>
      </div>
    </form>
  );
};

export default AdminTableRowSmall;
