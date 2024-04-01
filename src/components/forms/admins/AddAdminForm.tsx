"use client";

import { AppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { countries } from "@/globals/countries/countries";
import { setAlertPopUp, setPageLoading } from "@/store/alertSlice/alertSlice";
import { axiosAuth } from "@/utils/config/axios";
import { GET_ADMINS_URL } from "@/utils/config/urlConfigs";
import { validEmail } from "@/utils/helpers/customFunctions";
import { usePathname, useRouter } from "next/navigation";
import FullPageLoading from "@/components/loading/FullPageLoading";
import { adminsType } from "@/types/types";
import { getAdmins } from "@/store/adminSlice/actions";

const AddAdminForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentItem, setCurrentItem] = useState<adminsType | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [allCountries] = useState(countries());
  const [emptyFields, setEmptyFields] = useState(true);
  const [emailError, setEmailError] = useState("");

  const pathname = usePathname();
  const idQuery = pathname.split("/").pop();

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
    }
  }, [currentItem]);

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setEmailError("");
    setEmptyFields(true);
  };

  useEffect(() => {
    validateForms();
  }, [firstName, lastName, email, emailError, emptyFields]);

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

    setEmptyFields(false);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setPageLoading({
        status: true,
        message: "Adding new admin...",
      })
    );

    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    if (currentItem) {
      handleEdit(payload);

      return;
    }

    try {
      const response = await axiosAuth.post(GET_ADMINS_URL, payload);

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Admin Added",
            desc: "Admin have been added successfully!",
            payload: null,
          })
        );

        resetFields();

        dispatch(getAdmins(`?page=${1}&limit=${10}`));
        router.push("/admin/admins");
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Admin Not Added",
            desc: "Error occurred while adding Admin",
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
        GET_ADMINS_URL + `/${currentItem?._id}`,
        payload
      );
      // console.log("response", response);

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Admin Updated",
            desc: "Admin have been updated successfully!",
            payload: null,
          })
        );

        resetFields();

        dispatch(getAdmins(`?page=${1}&limit=${10}`));

        router.push("/admin/admins");
      } else {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Admin Not Updated",
            desc: "Error occurred while updating Admin",
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
      const response = await axiosAuth.get(GET_ADMINS_URL + `/${id}`);

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

export default AddAdminForm;
