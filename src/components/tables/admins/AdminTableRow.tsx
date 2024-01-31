import { AppDispatch } from "@/store/store";
import { adminsType } from "@/types/types";
import React from "react";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: adminsType;
  selectedItems: adminsType[];
  addCheckboxItems: (item: adminsType) => void;
}
const AdminTableRow = ({
  index,
  item,
  addCheckboxItems,
  selectedItems,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const isSelected = () => {
    let selected = selectedItems?.find((newItem) => newItem?._id === item?._id);
    return !!selected;
  };

  return (
    <tr>
      <td>
        <div className="width_img">
          {/* <input
            type="checkbox"
            checked={isSelected()}
            onChange={() => addCheckboxItems(item)}
          /> */}
          <span>{item?._id}</span>
        </div>
      </td>
      <td>{item?.firstName + " " + item?.lastName}</td>
      <td>{item?.email}</td>
      <td>
        <ActionButton item={item} />
      </td>
    </tr>
  );
};

export default AdminTableRow;
