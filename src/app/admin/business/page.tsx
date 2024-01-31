"use client";
import Pageheader from "@/components/header/Pageheader";
import BusinessStartupTable from "@/components/tables/startupsandbusiness/BusinessStartupTable";
import { getBusiness } from "@/store/businessSlice/actions";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BuinessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { business, businessLoading } = useSelector(
    (state: RootState) => state.business
  );
  // const apiClient = useAxiosWithAuth();
  // const fetchPost = async () => {
  //   const res = await apiClient.get(GET_BUSINESS_URL);

  //   console.log(res?.data);
  // };

  useEffect(() => {
    if (business?.length <= 0) {
      dispatch(getBusiness(`?page=${1}&limit=${10}`));
    }

    return () => {
      let query = `?page=${1}&limit=${10}`;
      dispatch(getBusiness(query));
    };
  }, []);

  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="Business" />

        <div className="hideFromTab">
          <div
            className="page_darkbutton auto_width "
            style={{ marginBottom: 60 }}
          >
            <Link as={"/admin/business/add"} href={"/admin/business"}>
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

        <BusinessStartupTable />
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
