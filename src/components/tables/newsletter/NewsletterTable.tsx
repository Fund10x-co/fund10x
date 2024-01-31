"use client";
import React, { useState } from "react";
import NewsletterTableRow from "./NewsletterTableRow";
import { Investors } from "@/types/tableTypes";
import TablePagination from "@/components/paginations/TablePagination";
import NewsletterTableRowSmall from "./NewsletterTableRowSmall";

const NewsletterTable = () => {
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const addCheckboxItems = (value: any) => {
    let alreadyAdded = selectedItems.find((items: any) => items === value);
    if (alreadyAdded) {
      setSelectedItems((allItems: any) =>
        allItems.filter((oldItem: any) => oldItem !== value)
      );
    } else {
      let newItem: any[] = [...selectedItems, value];

      setSelectedItems(newItem);
    }
  };

  const allInvestors: Investors[] = [
    {
      id: 1,
      investorID: "HFJ786OP",
      name: "Praise Williams",
      email: "praise@creativnerd.com",
      firmName: "Cre8tivnerd",
      type: "Angel",
      minInvestment: "$20,000 - $50,000",
    },
    {
      id: 2,
      investorID: "HFJ786OP",
      name: "Praise Williams",
      email: "praise@creativnerd.com",
      firmName: "Cre8tivnerd",
      type: "Angel",
      minInvestment: "$20,000 - $50,000",
    },
    {
      id: 3,
      investorID: "HFJ786OP",
      name: "Praise Williams",
      email: "praise@creativnerd.com",
      firmName: "Cre8tivnerd",
      type: "Angel",
      minInvestment: "$20,000 - $50,000",
    },
    {
      id: 4,
      investorID: "HFJ786OP",
      name: "Praise Williams",
      email: "praise@creativnerd.com",
      firmName: "Cre8tivnerd",
      type: "Angel",
      minInvestment: "$20,000 - $50,000",
    },
    {
      id: 5,
      investorID: "HFJ786OP",
      name: "Praise Williams",
      email: "praise@creativnerd.com",
      firmName: "Cre8tivnerd",
      type: "Angel",
      minInvestment: "$20,000 - $50,000",
    },
    {
      id: 6,
      investorID: "HFJ786OP",
      name: "Praise Williams",
      email: "praise@creativnerd.com",
      firmName: "Cre8tivnerd",
      type: "Angel",
      minInvestment: "$20,000 - $50,000",
    },
  ];

  return (
    <div className="site-all-table">
      <div className="site-large-table">
        {/* {selectedItems} */}
        <div className="site-table animate__animated animate__fadeInRight">
          <div className="table-responsive">
            <table className="table">
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
                      {/* <input
                                type="checkbox"
                                onChange={() => addCheckboxItems(null)}
                              /> */}
                      <span></span>

                      <span>Name</span>
                    </div>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              {allInvestors && allInvestors.length ? (
                <tbody>
                  {allInvestors?.map((item, index) => (
                    <NewsletterTableRow
                      // addCheckboxItems={addCheckboxItems}
                      key={index}
                      index={index}
                      item={item}
                    />
                  ))}

                  {/* <tr>
                    <td colSpan={5}>
                      <TablePagination />
                    </td>
                  </tr> */}
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
                          <h4 style={{ fontSize: "18px" }}>No Investor</h4>
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
        {allInvestors?.map((item, index) => (
          <NewsletterTableRowSmall
            // addCheckboxItems={addCheckboxItems}
            key={index}
            index={index}
            item={item}
          />
        ))}

        <div className="mt-5">
          <TablePagination />
        </div>

        {allInvestors && allInvestors.length <= 0 && (
          <div className="error_table">
            <br />
            <br />
            <p>
              <b>No User</b>
            </p>
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterTable;
