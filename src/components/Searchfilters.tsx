"use client";

import { BiCaretDown, BiSliderAlt, BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { setAlertSmallPOPUP } from "@/store/alertSlice/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getBusiness } from "@/store/businessSlice/actions";
import { getInvestors } from "@/store/investorSlice/actions";

type SearchfiltersProps = {
  showBulkFilter: boolean;
  showBulkExportFilter: boolean;
  handleShowBulkFilter: () => void;
  handleMainApply: (value: string) => void;
  handleMainSearch: (value: string) => void;
  setShowBulkExportFilter: React.Dispatch<React.SetStateAction<boolean>>;
  pagetype: string;
  bulkSearch: string[];
};

const Searchfilters = ({
  showBulkFilter,
  showBulkExportFilter,
  handleShowBulkFilter,
  setShowBulkExportFilter,
  handleMainApply,
  handleMainSearch,
  pagetype,
  bulkSearch,
}: SearchfiltersProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { business } = useSelector((state: RootState) => state.business);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBulkSearch, setSelectedBulkSearch] = useState<string>("");
  const [selectedBulkExport, setSelectedBulkExport] = useState<string>("");

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  // const [bulkSearch] = useState();
  const [bulkExport] = useState(["csv", "pdf", "excel"]);

  const handleUpdate = (value: string) => {
    setSearchText(value);
    if (value === "") {
      // if (allUsers && allUsers.length <= 0) {
      //   dispatch(getAllUsers());
      // }
    }
  };

  const handleSearch = () => {
    if (searchText === "") {
      if (isSearching === true) {
        let query = `?page=${1}&limit=${10}`;

        if (pagetype === "BUSINESS") {
          dispatch(getBusiness(query));
        }

        if (pagetype === "INVESTORS") {
          dispatch(getInvestors(query));
        }

        setIsSearching(false);
      }

      return;
    }

    if (searchText !== "") {
      handleMainSearch(searchText);
      setIsSearching(true);
    }

    // dispatch(searchAllUser(searchText));
  };

  const handleSelectFilters = (filter: string) => {
    if (filter === "Export") {
      setShowBulkExportFilter(true);
      return;
    }

    setSelectedBulkExport("");
    setSelectedBulkSearch(filter);
    setShowBulkExportFilter(false);
    handleShowBulkFilter();
  };

  const handleSelectExportFilters = (filter: string) => {
    setSelectedBulkExport(filter);
    setSelectedBulkSearch("");
    handleShowBulkFilter();
    setShowBulkExportFilter(!showBulkExportFilter);
  };

  const handleApply = () => {
    if (selectedBulkSearch === "" && selectedBulkExport === "") {
      return;
    }
    if (selectedBulkSearch === "Delete") {
      handleMainApply("Delete");
    } else {
      handleMainApply(selectedBulkExport);
    }
  };

  return (
    <div className="search_filters animate__animated animate__fadeInRight">
      <div className="search_filters_left hideOnMobile">
        {pagetype === "ADMINS" ? (
          <></>
        ) : (
          <div className="search_filters_left_item">
            <div
              className="search_filters_input"
              id="bulk_input"
              onClick={() => handleShowBulkFilter()}
            >
              <span>
                {selectedBulkExport
                  ? `Export - ${selectedBulkExport}`
                  : selectedBulkSearch
                  ? selectedBulkSearch
                  : "Bulk action"}
              </span>
              <div className="search_filters_icon_dropdown">
                <div className="iconCont">
                  <BiCaretDown />
                </div>
              </div>
            </div>
            <div
              className="search_filters_button"
              onClick={() => handleApply()}
            >
              Apply
            </div>

            {showBulkFilter && (
              <div className="home_button_dropdown for_search_filter ">
                {bulkSearch.map((item, index) => (
                  <p onClick={() => handleSelectFilters(item)} key={index}>
                    {item}
                  </p>
                ))}
              </div>
            )}

            {showBulkExportFilter && (
              <div className="home_button_dropdown for_search_export_filter ">
                {bulkExport.map((item, index) => (
                  <p
                    onClick={() => handleSelectExportFilters(item)}
                    key={index}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="search_filters_right">
        <div className="search_filters_div">
          <input
            value={searchText}
            onChange={(e) => handleUpdate(e.target.value)}
            type="text"
            placeholder="Search"
          />

          <button
            // disabled={searchText === ""}
            className="search_filters_icon_search"
            onClick={() => handleSearch()}
          >
            {/* <BiSliderAlt /> */}
            <BiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchfilters;
