import { AppDispatch } from "@/store/store";
import { investorType } from "@/types/types";
import React from "react";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: investorType;
  selectedItems: investorType[];
  addCheckboxItems: (item: investorType) => void;
}
const InvestorTableRow = ({
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
      <td>{item?.firmName}</td>
      <td>
        {item?.minimumInvestment?.length
          ? "$" +
            item?.minimumInvestment[0] +
            " - " +
            "$" +
            item?.minimumInvestment[1]
          : 0}
      </td>
      {/* <td>{item?.investmentStage}</td>
      <td>{item?.country}</td>
      <td>{item?.businessWebsite}</td> */}
      <td>
        <ActionButton item={item} />
      </td>
    </tr>
  );
};

export default InvestorTableRow;
