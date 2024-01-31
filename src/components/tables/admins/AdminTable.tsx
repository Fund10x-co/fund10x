"use client";
import React, { useEffect, useState } from "react";
import AdminTableRow from "./AdminTableRow";
import AdminTableRowSmall from "./AdminTableRowSmall";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ErrorTable from "@/components/error/ErrorTable";
import TableLoading from "@/components/loading/TableLoading";
import PaginationBlock from "@/components/paginations/PaginationBlock";
import { adminsType } from "@/types/types";
import Searchfilters from "@/components/Searchfilters";

import { getAdmins } from "@/store/adminSlice/actions";

const AdminTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    admins,
    adminsLoading,
    adminsError,
    adminsCurrentPage: page,
    adminsTotalPages: totalPages,
    adminsNextPage: nextPage,
    adminsTotalData: totalData,
  } = useSelector((state: RootState) => state.admins);

  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<adminsType[]>([]);

  const addCheckboxItems = (value: adminsType) => {
    let alreadyAdded = selectedItems.find(
      (items: adminsType) => items?._id === value?._id
    );
    if (alreadyAdded) {
      setSelectedItems((allItems: any) =>
        allItems.filter((oldItem: adminsType) => oldItem?._id !== value?._id)
      );
    } else {
      let newItem: adminsType[] = [...selectedItems, value];

      setSelectedItems(newItem);
    }
  };

  useEffect(() => {
    if (checkAll === true) {
      setSelectedItems(admins);
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

    dispatch(getAdmins(query));
    setSelectedItems([]);

    // dispatch(fetchMoreVehicles(payload));
  };

  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    let currentPage = page - 1;

    let query = `?page=${currentPage}&limit=${10}`;

    dispatch(getAdmins(query));
    setSelectedItems([]);
  };

  const handleFetchByPage = (newPage: number) => {
    if (page === newPage) {
      return;
    }

    let query = `?page=${newPage}&limit=${10}`;

    dispatch(getAdmins(query));
    setSelectedItems([]);
  };

  const handleMainSearch = (value: string) => {
    let query = `?page=${page}&limit=${10}&search=${value}`;

    dispatch(getAdmins(query));
  };
  const handleMainApply = (value: string) => {};

  // window.addEventListener("click", (e) => {
  //   const dropDown = document.querySelector(".home_button_dropdown");
  //   if (dropDown)
  //     if (!e.composedPath().includes(dropDown)) handleCloseBulkFilter(false);
  // });

  return (
    <>
      {adminsError?.status === false && !adminsLoading && (
        <Searchfilters
          showBulkFilter={false}
          showBulkExportFilter={false}
          handleShowBulkFilter={() => {}}
          setShowBulkExportFilter={() => {}}
          handleMainApply={() => {}}
          handleMainSearch={handleMainSearch}
          pagetype="ADMINS"
          bulkSearch={["Delete"]}
        />
      )}

      <div className="site-all-table">
        {adminsLoading ? (
          <TableLoading />
        ) : adminsError?.status === true ? (
          <ErrorTable requestType={"ADMINS"} />
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
                            {/* <input
                              type="checkbox"
                              checked={checkAll}
                              onChange={() => {
                                setCheckAll(!checkAll);
                              }}
                              style={{ marginLeft: 18 }}
                            /> */}
                            <span style={{ marginLeft: 18 }}>ID</span>
                          </div>
                        </th>
                        <th>Name</th>
                        <th>Email </th>
                        <th></th>
                      </tr>
                    </thead>

                    {admins && admins.length ? (
                      <tbody>
                        {admins?.map((item, index) => (
                          <AdminTableRow
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
                                <h4 style={{ fontSize: "18px" }}>No Admin</h4>
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
              {admins?.map((item, index) => (
                <AdminTableRowSmall
                  // addCheckboxItems={addCheckboxItems}
                  key={index}
                  index={index}
                  item={item}
                />
              ))}

              {/* <div className="mt-5">
              <TablePagination />
            </div> */}

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

              {admins && admins.length <= 0 && (
                <div className="error_table">
                  <br />
                  <br />
                  <p>
                    <b>No admins</b>
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

export default AdminTable;
