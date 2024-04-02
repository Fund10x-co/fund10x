"use client";
import React, { useEffect, useState } from "react";
import BusinessStartupTableRow from "./BusinessStartupTableRow";
import BusinessStartupTableRowSmall from "./BusinessStartupTableRowSmall";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ErrorTable from "@/components/error/ErrorTable";
import TableLoading from "@/components/loading/TableLoading";
import PaginationBlock from "@/components/paginations/PaginationBlock";
import { getBusiness } from "@/store/businessSlice/actions";
import { businessType } from "@/types/types";
import Searchfilters from "@/components/Searchfilters";
import {
  setAlertSmallPOPUP,
  setConfirmPopUp,
  setDownloadModal,
  setPageLoading,
} from "@/store/alertSlice/alertSlice";
import { axiosAuth } from "@/utils/config/axios";
import { GET_BUSINESS_EXPORT_URL } from "@/utils/config/urlConfigs";
import { useRouter } from "next/navigation";

const BusinessStartupTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    business,
    businessLoading,
    businessError,
    businessCurrentPage: page,
    businessTotalPages: totalPages,
    businessNextPage: nextPage,
    businessTotalData: totalData,
  } = useSelector((state: RootState) => state.business);
  const [showBulkExportFilter, setShowBulkExportFilter] =
    useState<boolean>(false);
  const [showBulkFilter, setShowBulkFilter] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const [selectedItems, setSelectedItems] = useState<businessType[]>([]);

  const addCheckboxItems = (value: businessType) => {
    let alreadyAdded = selectedItems.find(
      (items: businessType) => items?._id === value?._id
    );
    if (alreadyAdded) {
      setSelectedItems((allItems: any) =>
        allItems.filter((oldItem: businessType) => oldItem?._id !== value?._id)
      );
    } else {
      let newItem: businessType[] = [...selectedItems, value];

      setSelectedItems(newItem);
    }
  };

  // useEffect(() => {
  //   if (selectedItems?.length) {
  //     console.log("selectedItems", selectedItems);
  //   }
  // }, [selectedItems]);
  useEffect(() => {
    if (checkAll === true) {
      setSelectedItems(business);
    } else {
      setSelectedItems([]);
    }
  }, [checkAll]);

  const handleNext = () => {
    if (page === totalPages) {
      return;
    }
    let currentPage = page + 1;

    let query = `?page=${currentPage}&limit=${10}`;

    dispatch(getBusiness(query));
    setSelectedItems([]);

    // dispatch(fetchMoreVehicles(payload));
  };

  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    let currentPage = page - 1;

    let query = `?page=${currentPage}&limit=${10}`;

    dispatch(getBusiness(query));
    setSelectedItems([]);
  };

  const handleFetchByPage = (newPage: number) => {
    if (page === newPage) {
      return;
    }

    let query = `?page=${newPage}&limit=${10}`;

    dispatch(getBusiness(query));
    setSelectedItems([]);
  };

  const handleShowBulkFilter = () => {
    setTimeout(() => {
      setShowBulkFilter(!showBulkFilter);
    }, 200);
    // setShowBulkFilter(!showBulkFilter);
    // setShowBulkExportFilter(!showBulkExportFilter);
  };

  const handleCloseBulkFilter = (value: boolean) => {
    setShowBulkFilter(value);
    setShowBulkExportFilter(value);
  };

  const handleMainSearch = (value: string) => {
    let query = `?page=${page}&limit=${10}&search=${value}`;

    dispatch(getBusiness(query));
  };
  const handleMainApply = (value: string) => {
    if (value === "Delete") {
      if (selectedItems?.length <= 0) {
        dispatch(
          setAlertSmallPOPUP({
            status: true,
            type: "error",
            message: "Please select items to delete",
          })
        );

        return;
      }

      let onlyIds = selectedItems?.map((item) => item?._id);

      // console.log("onlyIds", String(onlyIds));

      dispatch(
        setConfirmPopUp({
          status: true,
          type: "DELETE_BUSINESS",
          title: "Delete businesses",
          desc: "Are you sure you want to bulk delete businesses?",
          payload: {
            id: String(onlyIds),
          },
          buttonText: "Proceed",
        })
      );

      return;
    }

    handlefetchExport(value);

    // console.log("value", value);
  };

  const handlefetchExport = async (value: string) => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Processing...",
      })
    );

    try {
      const response = await axiosAuth.get(
        GET_BUSINESS_EXPORT_URL + `/${value}`
      );
      // console.log("response", response?.data);

      let data = response?.data;

      if (data) {
        // console.log("here data");
        // router.push(data);
        // window.location.href = data;
        // window.location.replace(data);

        // window.open(data, "_blank", "noopener,noreferrer");

        if (typeof window !== "undefined") {
          const newTab = window.open(data?.data, "_blank");
          if (newTab) {
            newTab.focus();
          } else {
            console.error("Failed to open PDF link in new tab.");
          }
        }

        // let fileName = "fund10x" + Date.now() + "." + value;

        // const link = document.createElement("a");
        // link.href = data;
        // // link.download = fileName;
        // link.target = "_blank";
        // link.rel = "noopener noreferrer";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      }
    } catch (error: any) {
      // console.log("error", error?.response?.data?.errors);

      dispatch(
        setAlertSmallPOPUP({
          status: true,
          type: "error",
          message: "Error occurred while fetching resources",
        })
      );
    }

    dispatch(
      setPageLoading({
        status: false,
        message: "",
      })
    );
  };

  window.addEventListener("click", (e) => {
    const dropDown = document.querySelector(".home_button_dropdown");
    if (dropDown)
      if (!e.composedPath().includes(dropDown)) handleCloseBulkFilter(false);
  });

  return (
    <>
      {businessError?.status === false && !businessLoading && (
        <Searchfilters
          showBulkFilter={showBulkFilter}
          showBulkExportFilter={showBulkExportFilter}
          handleShowBulkFilter={handleShowBulkFilter}
          setShowBulkExportFilter={setShowBulkExportFilter}
          handleMainApply={handleMainApply}
          handleMainSearch={handleMainSearch}
          pagetype="BUSINESS"
          bulkSearch={["Export", "Delete"]}
        />
      )}

      <div className="site-all-table">
        {businessLoading ? (
          <TableLoading />
        ) : businessError?.status === true ? (
          <ErrorTable requestType={"BUSINESS"} />
        ) : (
          <>
            <div className="site-large-table">
              {/* {selectedItems} */}
              <div className="site-table animate__animated animate__fadeInRight">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>
                          <div className="width_img">
                            <input
                              type="checkbox"
                              checked={checkAll}
                              onChange={() => {
                                setCheckAll(!checkAll);
                              }}
                              style={{ marginLeft: 18 }}
                            />
                            <span>ID</span>
                          </div>
                        </th>
                        <th>Name</th>
                        {/* <th>Work email </th> */}
                        <th>Business name</th>
                        <th>Business type </th>
                        {/* <th>Investment stage</th>
                      <th>Country</th>
                      <th>Business website</th> */}
                        <th></th>
                      </tr>
                    </thead>

                    {business && business.length ? (
                      <tbody>
                        {business?.map((item, index) => (
                          <BusinessStartupTableRow
                            addCheckboxItems={addCheckboxItems}
                            key={index}
                            index={index}
                            item={item}
                            selectedItems={selectedItems}
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
                                  No Business
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
              {business?.map((item, index) => (
                <BusinessStartupTableRowSmall
                  // addCheckboxItems={addCheckboxItems}
                  key={index}
                  index={index}
                  item={item}
                />
              ))}

              {totalData ? (
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

              {business && business.length <= 0 && (
                <div className="error_table">
                  <br />
                  <br />
                  <p>
                    <b>No business</b>
                  </p>
                  <br />
                  <br />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BusinessStartupTable;
