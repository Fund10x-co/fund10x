"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  pageTitle: string;
  hasArrowBack?: boolean;
}
const Pageheader = ({ pageTitle, hasArrowBack = false }: Props) => {
  const router = useRouter();
  return (
    <div
      className="inner_page_top animate__animated animate__fadeInLeft"
      style={{ marginBottom: 40 }}
    >
      <div className="customFlex">
        {hasArrowBack && (
          <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
            <BiArrowBack size={27} color={"#171717"} />
          </div>
        )}

        <h3 className="inner_page_top_title " style={{ marginBottom: 0 }}>
          {pageTitle}
        </h3>
      </div>
    </div>
  );
};

export default Pageheader;
