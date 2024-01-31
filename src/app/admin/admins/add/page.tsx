import Pageheader from "@/components/header/Pageheader";
import React from "react";
import AddAdminForm from "@/components/forms/admins/AddAdminForm";

const AddInvestors = () => {
  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Add Admin" hasArrowBack={true} />
        <AddAdminForm />
      </div>
    </div>
  );
};

export default AddInvestors;
