import Pageheader from "@/components/header/Pageheader";
import React from "react";
import AddBusinessForm from "@/components/forms/business/AddBusinessForm";

const AddInvestors = () => {
  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Edit Business" hasArrowBack={true} />
        <AddBusinessForm />
      </div>
    </div>
  );
};

export default AddInvestors;
