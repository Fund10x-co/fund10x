import { investorType } from "@/types/types";
import React from "react";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: investorType;
  // addCheckboxItems: () => {};
}

const InvestorTableRowSmall = ({ index, item }: Props) => {
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
          <p>{item?.firmName || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Investor type</p>
          <p>{item?.investorType || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Job title</p>
          <p>{item?.jobTitle || "---"} </p>
        </div>
        <div className="site-user-details-items">
          <p>Min investment</p>
          <p>
            {item?.minimumInvestment?.length
              ? "$" +
                item?.minimumInvestment[0] +
                " - " +
                "$" +
                item?.minimumInvestment[1]
              : 0}{" "}
          </p>
        </div>
        <div className="site-user-details-items">
          <p>Country</p>
          <p>{item?.country || "---"} </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <ActionButton item={item} />
        </div>
      </div>
    </form>
  );
};

export default InvestorTableRowSmall;
