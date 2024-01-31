import Pageheader from "@/components/header/Pageheader";
import AddNotificationForm from "@/components/forms/AddNotificationForm";
import React from "react";

const AddNewsletter = () => {
  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <div style={{ marginTop: -60 }}></div>
        <Pageheader pageTitle="Add Newsletter" />
        <AddNotificationForm />
      </div>
    </div>
  );
};

export default AddNewsletter;
