"use client";
import React, { useEffect, useState } from "react";
import NewsletterTableRow from "./NewsletterTableRow";
import NewsletterTableRowSmall from "./NewsletterTableRowSmall";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { newsletterType } from "@/types/types";
import TableLoading from "@/components/loading/TableLoading";
import ErrorTable from "@/components/error/ErrorTable";
import PaginationBlock from "@/components/paginations/PaginationBlock";
import { getNewsletters } from "@/store/newsletterSlice/actions";

const NewsletterTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    newsletters,
    newsletterLoading,
    newsletterError,
    newsletterCurrentPage: page,
    newsletterTotalPages: totalPages,
    newsletterNextPage: nextPage,
    newsletterTotalData: totalData,
  } = useSelector((state: RootState) => state.newsletter);

  const handleNext = () => {
    if (page === totalPages) {
      return;
    }
    let currentPage = page + 1;

    let query = `?page=${currentPage}&limit=${10}`;

    dispatch(getNewsletters(query));
  };

  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    let currentPage = page - 1;

    let query = `?page=${currentPage}&limit=${10}`;

    dispatch(getNewsletters(query));
  };

  const handleFetchByPage = (newPage: number) => {
    if (page === newPage) {
      return;
    }

    let query = `?page=${newPage}&limit=${10}`;

    dispatch(getNewsletters(query));
  };

  // window.addEventListener("click", (e) => {
  //   const dropDown = document.querySelector(".home_button_dropdown");
  //   if (dropDown)
  //     if (!e.composedPath().includes(dropDown)) handleCloseBulkFilter(false);
  // });

  return (
    <div className="site-all-table">
      {newsletterLoading ? (
        <TableLoading />
      ) : newsletterError?.status === true ? (
        <ErrorTable requestType={"NEWSLETTER"} />
      ) : (
        <>
          <div className="site-large-table">
            <div className="site-table animate__animated animate__fadeInRight">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th colSpan={4}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: 40,
                            paddingLeft: 20,
                          }}
                        >
                          <span></span>

                          <span>Name</span>
                        </div>
                      </th>
                      <th style={{ textAlign: "center" }}>Audience</th>
                      <th style={{ textAlign: "center" }}>Date/status</th>
                      <th style={{ textAlign: "center" }}></th>
                    </tr>
                  </thead>

                  {newsletters && newsletters.length ? (
                    <tbody>
                      {newsletters?.map((item, index) => (
                        <NewsletterTableRow
                          key={index}
                          index={index}
                          item={item}
                        />
                      ))}
                      {totalData > 10 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{ paddingBottom: 10, paddingTop: 15 }}
                          >
                            <PaginationBlock
                              handlePrev={handlePrev}
                              handleNext={handleNext}
                              page={page}
                              nextPage={nextPage}
                              totalPages={totalPages}
                              handleFetchByPage={handleFetchByPage}
                            />
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={7}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <br />
                              <br />
                              <br />
                              <h4 style={{ fontSize: "18px" }}>
                                No Newsletter
                              </h4>
                              <br />
                              <br />
                              <br />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          <div className="site-small-table">
            {newsletters?.map((item, index) => (
              <NewsletterTableRowSmall key={index} index={index} item={item} />
            ))}

            {totalData > 10 ? (
              <div className="mt-5">
                <PaginationBlock
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  page={page}
                  nextPage={nextPage}
                  totalPages={totalPages}
                  handleFetchByPage={handleFetchByPage}
                />
              </div>
            ) : null}

            {newsletters && newsletters.length <= 0 && (
              <div className="error_table">
                <br />
                <br />
                <p>
                  <b>No Investor</b>
                </p>
                <br />
                <br />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsletterTable;
