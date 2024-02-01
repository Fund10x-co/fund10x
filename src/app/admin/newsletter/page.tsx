"use client";
import Pageheader from "@/components/header/Pageheader";
import NewsletterTable from "@/components/tables/newsletter/NewsletterTable";
import { getNewsletters } from "@/store/newsletterSlice/actions";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Newsletter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsletters } = useSelector((state: RootState) => state.newsletter);

  useEffect(() => {
    if (newsletters?.length <= 0) {
      dispatch(getNewsletters(`?page=${1}&limit=${10}`));
    }

    return () => {
      let query = `?page=${1}&limit=${10}`;
      dispatch(getNewsletters(query));
    };
  }, []);

  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Newsletter" />

        <div className="hideFromTab">
          <div
            className="page_darkbutton auto_width "
            style={{ marginBottom: 60 }}
          >
            <Link as={"/admin/newsletter/add"} href={"/admin/newsletter/add"}>
              <button
                type="button"
                className="site_button animate__animated animate__fadeInLeft"
              >
                <span>Add New</span>
                <i className="bx bx-plus"></i>
              </button>
            </Link>
          </div>
        </div>

        <NewsletterTable />
      </div>
    </div>
  );
};

export default Newsletter;
