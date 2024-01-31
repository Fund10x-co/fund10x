import Pageheader from "@/components/header/Pageheader";
import NewsletterTable from "@/components/tables/newsletter/NewsletterTable";
import Link from "next/link";
import React from "react";

const Newsletter = () => {
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
