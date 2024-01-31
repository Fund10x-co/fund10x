import Searchfilters from "@/components/Searchfilters";
import Pageheader from "@/components/header/Pageheader";
import InvestorTable from "@/components/tables/investors/InvestorTable";
import Link from "next/link";
import React from "react";

const Startups = () => {
  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Startups" />

        <div className="hideFromTab">
          <div
            className="page_darkbutton auto_width "
            style={{ marginBottom: 60 }}
          >
            <Link as={"/admin/startUps/add"} href={"/admin/investors"}>
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

        <Searchfilters />
        <InvestorTable />
        <div className="mt-5">
          <Searchfilters />
        </div>
      </div>
    </div>
  );
};

export default Startups;
