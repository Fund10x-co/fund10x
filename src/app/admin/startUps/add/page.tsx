import Pageheader from "@/components/header/Pageheader";
import React from "react";
import AddInvestorsForm from "@/components/forms/investors/AddInvestorsForm";

const AddInvestors = () => {
  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <div style={{ marginTop: -60 }}></div>
        <Pageheader pageTitle="Add Business" />
        <AddInvestorsForm />
      </div>
    </div>
  );
};

export default AddInvestors;
