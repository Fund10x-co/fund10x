"use client";
import Pageheader from "@/components/header/Pageheader";
import AdminTable from "@/components/tables/admins/AdminTable";
import { getAdmins } from "@/store/adminSlice/actions";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BuinessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { admins, adminsLoading } = useSelector(
    (state: RootState) => state.admins
  );

  useEffect(() => {
    if (admins?.length <= 0) {
      dispatch(getAdmins(`?page=${1}&limit=${10}`));
    }

    return () => {
      let query = `?page=${1}&limit=${10}`;
      dispatch(getAdmins(query));
    };
  }, []);

  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Admins" />

        <div className="hideFromTab">
          <div
            className="page_darkbutton auto_width "
            style={{ marginBottom: 20 }}
          >
            <Link as={"/admin/admins/add"} href={"/admin/admins"}>
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

        <AdminTable />
        {/* {!businessLoading && business?.length ? (
          <div className="mt-5">
            <Searchfilters />
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default BuinessPage;
