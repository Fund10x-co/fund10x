"use client";
import Pageheader from "@/components/header/Pageheader";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { businessType } from "@/types/types";
import { axiosAuth } from "@/utils/config/axios";
import { GET_BUSINESS_URL } from "@/utils/config/urlConfigs";
import FullPageLoading from "@/components/loading/FullPageLoading";
import { removeFormatDate } from "@/utils/helpers/globalFunc";

const AddInvestors = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentItem, setCurrentItem] = useState<businessType | null>(null);

  const pathname = usePathname();
  const idQuery = pathname.split("/").pop();

  useEffect(() => {
    if (idQuery && idQuery !== "add") {
      console.log("id", idQuery);
      getCurrentItem(idQuery);
    }
  }, [idQuery, dispatch]);

  const getCurrentItem = async (id: any) => {
    try {
      const response = await axiosAuth.get(GET_BUSINESS_URL + `/${id}`);

      if (response?.data?.error === false) {
        setCurrentItem(response?.data?.data);
      } else {
        router.back();
      }

      console.log("response", response);
    } catch (error) {
      router.back();
    }
  };

  if (idQuery && idQuery !== "add" && !currentItem) {
    return <FullPageLoading />;
  }

  const handleEdit = () => {
    router?.push(`/admin/business/edit/${currentItem?._id}`);
  };

  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="View Business" hasArrowBack={true} />
        <>
          <div className="fasta-form-div form-view ">
            {currentItem && (
              <form className="fast-form-view">
                <h4 className="fasta-user-name">
                  {currentItem.firstName
                    ? currentItem.firstName + " " + currentItem.lastName
                    : "Not added"}
                </h4>

                <div
                  className="customFlex"
                  style={{ justifyContent: "center" }}
                >
                  <div className="fasta-user-span-tag">
                    Registered {removeFormatDate(currentItem.createdAt)}
                  </div>
                </div>

                <div className="site-user-details">
                  <div className="site-user-details-items">
                    <p>Email</p>
                    <p>{currentItem.email}</p>
                  </div>
                  <div className="site-user-details-items">
                    <p>Phone</p>
                    <p>{currentItem?.phone || "Not added"} </p>
                  </div>
                  <div className="site-user-details-items">
                    <p>Business name</p>
                    <p>{currentItem?.businessName || "Not added"} </p>
                  </div>
                  <div className="site-user-details-items">
                    <p>Business type</p>
                    <p>{currentItem?.businessType || "Not added"} </p>
                  </div>

                  <div className="site-user-details-items">
                    <p>Investor stage</p>
                    <p>{currentItem?.investmentStage || "Not added"} </p>
                  </div>
                  <div className="site-user-details-items">
                    <p>Job Title</p>
                    <p>{currentItem?.jobTitle || "Not added"} </p>
                  </div>
                  <div className="site-user-details-items">
                    <p>Business website</p>
                    <p>{currentItem?.businessWebsite || "Not added"} </p>
                  </div>
                </div>

                <div
                  className="customFlex"
                  style={{ justifyContent: "center" }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      handleEdit();
                    }}
                    style={{ width: 200 }}
                    className="site_button animate__animated animate__fadeInLeft"
                  >
                    Edit
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default AddInvestors;
