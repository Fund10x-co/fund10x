"use client";
import Pageheader from "@/components/header/Pageheader";
import AddNotificationForm from "@/components/forms/AddNotificationForm";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getNewsletters } from "@/store/newsletterSlice/actions";

const AddNewsletter = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let query = `?page=${1}&limit=${10}`;
    dispatch(getNewsletters(query));
  }, []);

  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Add Newsletter" />
        <AddNotificationForm />
      </div>
    </div>
  );
};

export default AddNewsletter;
