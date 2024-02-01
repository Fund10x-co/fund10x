"use client";
import Pageheader from "@/components/header/Pageheader";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { investorType, newsletterType } from "@/types/types";
import { axiosAuth } from "@/utils/config/axios";
import {
  GET_INVESTORS_URL,
  GET_NEWSLETTER_URL,
} from "@/utils/config/urlConfigs";
import FullPageLoading from "@/components/loading/FullPageLoading";
import { removeFormatDate } from "@/utils/helpers/globalFunc";
import Image from "next/image";
import HTMLToString from "@/components/block/HTMLToString";

const AddInvestors = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentItem, setCurrentItem] = useState<newsletterType | null>(null);

  const pathname = usePathname();
  const idQuery = pathname.split("/").pop();

  useEffect(() => {
    if (idQuery && idQuery !== "add") {
      // console.log("id", idQuery);
      getCurrentItem(idQuery);
    }
  }, [idQuery, dispatch]);

  const getCurrentItem = async (id: any) => {
    try {
      const response = await axiosAuth.get(GET_NEWSLETTER_URL + `/${id}`);

      if (response?.data?.error === false) {
        setCurrentItem(response?.data?.data);
      } else {
        router.back();
      }

      // console.log("response", response);
    } catch (error) {
      router.back();
    }
  };

  if (idQuery && idQuery !== "add" && !currentItem) {
    return <FullPageLoading />;
  }

  const htmlString = "<p>This is some <strong>HTML</strong> content.</p>";

  return (
    <div className="section_body">
      <div className="container-fluid inner_container_small">
        <Pageheader pageTitle="View Investor" hasArrowBack={true} />
        <div
          className="fasta-form-div card notification_details"
          style={{ margin: "auto" }}
        >
          <div className="card-body">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label htmlFor="">19 Jun 2022, 10:59 pm</label>
              <div>
                <p
                  style={{
                    textAlign: "center",
                  }}
                  className={`isNormal ${currentItem?.sent ? "isSent" : ""}`}
                >
                  {currentItem?.sent ? "Sent" : "Not sent"}
                </p>
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              {currentItem?.imageUrl ? (
                <Image
                  property={"false"}
                  src={currentItem?.imageUrl}
                  alt=""
                  width={70}
                  height={70}
                  style={{
                    marginLeft: 10,
                  }}
                />
              ) : (
                <Image
                  property={"false"}
                  src={require("@/assets/img/default.png")}
                  alt=""
                  style={{
                    width: 70,
                    marginLeft: 10,
                  }}
                />
              )}
            </div>

            <h4>{currentItem?.title}</h4>
            <p>{currentItem?.description}</p>
            <div>
              {/* <label htmlFor="">Link</label>
              <br /> */}
              <a href={currentItem?.link}>{currentItem?.link}</a>
            </div>

            <div style={{ marginTop: 20 }}>
              <HTMLToString htmlString={currentItem?.htmlContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvestors;
