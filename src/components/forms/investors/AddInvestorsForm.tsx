"use client";

import { AppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { countries } from "@/globals/countries/countries";
import { setAlertPopUp, setPageLoading } from "@/store/alertSlice/alertSlice";
import { axiosAuth } from "@/utils/config/axios";
import { GET_INVESTORS_URL } from "@/utils/config/urlConfigs";
import { validEmail } from "@/utils/helpers/customFunctions";
import { usePathname, useRouter } from "next/navigation";
import FullPageLoading from "@/components/loading/FullPageLoading";
import { investorType } from "@/types/types";
import { getInvestors } from "@/store/investorSlice/actions";

const AddInvestorsForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentItem, setCurrentItem] = useState<investorType | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firmName, setFirmName] = useState("");
  const [investorType, setInvestorType] = useState("");
  const [minimumInvestmentTop, setMinimumInvestmentTop] = useState(0);
  const [minimumInvestmentBottom, setMinimumInvestmentBottom] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [allCountries] = useState(countries());
  const [country, setCountry] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [emailError, setEmailError] = useState("");

  const pathname = usePathname();
  const idQuery = pathname.split("/").pop();
  // let idQuery = searchParams.get("id");

  useEffect(() => {
    if (idQuery && idQuery !== "add") {
      // console.log("id", idQuery);
      getCurrentItem(idQuery);
    }
  }, [idQuery, dispatch]);

  useEffect(() => {
    if (currentItem) {
      setFirstName(currentItem?.firstName);
      setLastName(currentItem?.lastName);
      setEmail(currentItem?.email);
      setPhone(currentItem?.phone);
      setFirmName(currentItem?.firmName);
      setInvestorType(currentItem?.investorType);
      setMinimumInvestmentTop(currentItem?.minimumInvestment[0]);
      setMinimumInvestmentBottom(currentItem?.minimumInvestment[1]);
      setJobTitle(currentItem?.jobTitle);
      setCountry(currentItem?.country);
    }
  }, [currentItem]);

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setFirmName("");
    setInvestorType("");
    setJobTitle("");
    setCountry("");
    setEmailError("");
    setEmptyFields(true);
    setMinimumInvestmentTop(0);
    setMinimumInvestmentBottom(0);
  };

  useEffect(() => {
    validateForms();
  }, [
    firstName,
    lastName,
    email,
    phone,
    firmName,
    investorType,
    minimumInvestmentTop,
    minimumInvestmentBottom,
    jobTitle,
    country,
    emailError,
    emptyFields,
  ]);

  const validateForms = () => {
    if (firstName === "") {
      setEmptyFields(true);
      return;
    }
    if (lastName === "") {
      setEmptyFields(true);
      return;
    }
    if (email === "") {
      setEmptyFields(true);
      return;
    }
    if (validEmail(email) === false) {
      setEmailError("Invalid email address");
      setEmptyFields(true);
      return false;
    }

    setEmailError("");
    if (phone === "") {
      setEmptyFields(true);
      return;
    }
    if (firmName === "") {
      setEmptyFields(true);
      return;
    }
    if (investorType === "") {
      setEmptyFields(true);
      return;
    }

    if (jobTitle === "") {
      setEmptyFields(true);
      return;
    }
    if (minimumInvestmentTop === 0) {
      setEmptyFields(true);
      return;
    }

    if (minimumInvestmentBottom === 0) {
      setEmptyFields(true);
      return;
    }
    if (country === "") {
      setEmptyFields(true);
      return;
    }

    setEmptyFields(false);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setPageLoading({
        status: true,
        message: "Adding new Investor...",
      })
    );

    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      firmName: firmName,
      investorType: investorType,
      minimumInvestmentTop: minimumInvestmentTop,
      minimumInvestmentBottom: minimumInvestmentBottom,
      jobTitle: jobTitle,
      country: country,
    };

    if (currentItem) {
      handleEdit(payload);

      return;
    }

    try {
      const response = await axiosAuth.post(GET_INVESTORS_URL, payload);
      // console.log("response", response);

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Investor Added",
            desc: "Investor have been added successfully!",
            payload: null,
          })
        );

        resetFields();

        dispatch(getInvestors(`?page=${1}&limit=${10}`));
        router.push("/admin/investors");
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Investor Not Added",
            desc: "Error occurred while adding Investor",
            payload: null,
          })
        );
      }
    } catch (error: any) {
      dispatch(
        setAlertPopUp({
          status: true,
          type: "error",
          title: "Error",
          desc:
            error?.response?.data?.errors[0] ||
            "Something's wrong, please try again",
          payload: null,
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

  const handleEdit = async (payload: any) => {
    try {
      const response = await axiosAuth.put(
        GET_INVESTORS_URL + `/${currentItem?._id}`,
        payload
      );
      // console.log("response", response);

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Investor Updated",
            desc: "Investor have been updated successfully!",
            payload: null,
          })
        );

        resetFields();

        dispatch(getInvestors(`?page=${1}&limit=${10}`));

        router.push("/admin/investors");
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Investor Not Updated",
            desc: "Error occurred while updating Investor",
            payload: null,
          })
        );
      }
    } catch (error: any) {
      dispatch(
        setAlertPopUp({
          status: true,
          type: "error",
          title: "Error",
          desc:
            error?.response?.data?.errors[0] ||
            "Something's wrong, please try again",
          payload: null,
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
  const getCurrentItem = async (id: any) => {
    try {
      const response = await axiosAuth.get(GET_INVESTORS_URL + `/${id}`);

      if (response?.data?.error === false) {
        setCurrentItem(response?.data?.data);
      } else {
        router.back();
      }

      // if (process.env.NODE_ENV === "development") {
      //   // console.log("response", response);
      // }
    } catch (error) {
      router.back();
    }
  };

  if (idQuery && idQuery !== "add" && !currentItem) {
    return <FullPageLoading />;
  }
  return (
    <div className="fasta-form-div">
      <form onSubmit={submitForm}>
        <div className="row mt-5">
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">First name</label>
              <input
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value.replace(/\s/g, ""))
                }
                type="text"
                placeholder="First name"
              />
            </div>
          </div>
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value.replace(/\s/g, ""))}
                type="text"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
                type="text"
                placeholder="Last name"
              />
              {emailError && (
                <p className="inputError">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 20 20"
                    role="presentation"
                    focusable="false"
                    tabIndex={-1}
                    fill="red"
                  >
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                  </svg>
                  {emailError}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Phone</label>
              <input
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value ? String(parseInt(e.target.value, 10)) : ""
                  )
                }
                maxLength={10}
                placeholder="8025777224"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Firm name</label>
              <input
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                type="text"
                placeholder="Firm name"
              />
            </div>
          </div>
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Investor Type</label>
              <select
                value={investorType}
                onChange={(e) => {
                  if (e.target?.value === "") {
                    return;
                  }

                  setInvestorType(e.target.value);
                }}
              >
                <option value="">Select type</option>
                {/* <option value="">--</option> */}
                <option value="angel_investor">Angel Investor</option>
                <option value="pre_seed_investor">Pre-seed Investor</option>
                <option value="seed_investor">Seed Investor</option>
                <option value="series_investor">Series Investor</option>
                <option value="growth_investor">Growth Investor</option>
                <option value="private_equity">Private Equity</option>
                <option value="venture_capital">Venture Capital</option>
              </select>
            </div>
          </div>

          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Minimum Investment Top</label>
              <input
                value={minimumInvestmentTop}
                onChange={(e) =>
                  setMinimumInvestmentTop(Number(parseInt(e.target.value, 10)))
                }
                type="text"
                placeholder="0"
              />
            </div>
          </div>
          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Minimum Investment Bottom</label>
              <input
                value={minimumInvestmentBottom}
                onChange={(e) =>
                  setMinimumInvestmentBottom(
                    Number(parseInt(e.target.value, 10))
                  )
                }
                type="text"
                placeholder="0"
              />
            </div>
          </div>
          {/* <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Investment Stage</label>
              <select
                value={investmentStage}
                onChange={(e) => {
                  if (e.target?.value === "") {
                    return;
                  }

                  setInvestmentStage(e.target.value);
                }}
              >
                <option value="">Select stage</option>
                <option value="seed">seed</option>
                <option value="startup">startup</option>
                <option value="growth">growth</option>
                <option value="established">established</option>
                <option value="expansion">expansion</option>
                <option value="maturity">maturity</option>
                <option value="exit">exit</option>
              </select>
            </div>
          </div> */}

          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Job Title</label>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                type="text"
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="col-md-6 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Country</label>
              <select
                value={country}
                onChange={(e) => {
                  if (e.target?.value === "") {
                    return;
                  }
                  setCountry(e.target.value);
                }}
              >
                <option value="">Select country</option>
                {allCountries &&
                  allCountries?.map((country, index) => (
                    <option key={index} value={country?.name}>
                      {country?.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-2">
            <div className="form-group">
              <button
                disabled={emptyFields}
                type="submit"
                className="site_button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInvestorsForm;
