"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BiCloudUpload } from "react-icons/bi";

import { BiX } from "react-icons/bi";
import { setAlertPopUp, setPageLoading } from "@/store/alertSlice/alertSlice";
import { axiosAuth } from "@/utils/config/axios";
import { GET_NEWSLETTER_URL } from "@/utils/config/urlConfigs";
import { useRouter } from "next/navigation";
import { getNewsletters } from "@/store/newsletterSlice/actions";
import { AppDispatch } from "@/store/store";

const AddNotificationForm = () => {
  const router = useRouter();

  const manyImage = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isOn, setIsOn] = useState<boolean>(true);
  const [emptyFields, setEmptyFields] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // const [receipients] = useState<string[]>(["Users", "Riders", "Fleet owners"]);
  // const [parameters] = useState<string[]>([
  //   "All Users that are inactive",
  //   "All Users that are that have not added a card",
  //   "All Users that are that Don’t have money in their wallet",
  // ]);

  // const [selectedReceipients, setSelectedReceipients] = useState<string[]>([
  //   "Users",
  // ]);

  // const [selectedParameters, setSelectedParameters] = useState<string[]>([]);

  const handleSwitchToggle = () => {
    setIsOn(!isOn);
  };

  const handleChange = (newContent: string) => {
    // setContent(newContent);

    console.log("newContent", newContent);
  };

  // const selectReceipient = (receipient: any) => {
  //   let selected = selectedReceipients.find(
  //     (oldReceipeint) => oldReceipeint === receipient
  //   );
  //   if (selected) {
  //     setSelectedReceipients((items) =>
  //       items.filter((item) => item !== receipient)
  //     );
  //   } else {
  //     setSelectedReceipients((items) => [...items, receipient]);
  //   }
  // };

  const triggerImageInput = () => {
    manyImage?.current?.click();
  };

  // useEffect(() => {
  //   console.log("images", images);
  // }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const changeManyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDocumentFile(null);
  //   let files: File | null;

  //   files = (e.target as HTMLInputElement)?.files;
  //   if (files) {
  //     // const _files = Array.from(files);
  //     // let prev = [...images, ..._files];
  //     setImages(files);

  //     // console.log("prev", prev);
  //   }
  // };

  // const selectParamter = (parameter: string) => {
  //   let selected = selectedParameters.find(
  //     (oldParameter) => oldParameter === parameter
  //   );
  //   if (selected) {
  //     setSelectedParameters((items) =>
  //       items.filter((item) => item !== parameter)
  //     );
  //   } else {
  //     setSelectedParameters((items) => [...items, parameter]);
  //   }
  // };

  // const removeImageDocs = (file: File) => {
  //   // console.log(file);
  //   setImages((imagesFiles) =>
  //     imagesFiles.filter((item: any) => item?.name !== file?.name)
  //   );
  // };

  const removeImageDocs = () => {
    setSelectedImage("");
  };

  useEffect(() => {
    validateForms();
  }, [title, link, audience, imageUrl, message, textContent, emptyFields]);

  const validateForms = () => {
    if (imageUrl === "") {
      setEmptyFields(true);
      return;
    }
    if (title === "") {
      setEmptyFields(true);
      return;
    }
    if (link === "") {
      setEmptyFields(true);
      return;
    }
    if (textContent === "") {
      setEmptyFields(true);
      return;
    }
    if (audience === "") {
      setEmptyFields(true);
      return;
    }

    if (message === "") {
      setEmptyFields(true);
      return;
    }

    setEmptyFields(false);
  };

  // console.log("selectedImage", selectedImage);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setPageLoading({
        status: true,
        message: "Adding newsletter...",
      })
    );

    let payload = {
      audience: audience,
      title: title,
      description: message,
      link: link,
      textContent: `<h1>Sample content</h1>`,
      htmlContent: `<h1>Sample content</h1>`,
      imageUrl: imageUrl,
      sent: isOn,
    };

    try {
      const response = await axiosAuth.post(
        GET_NEWSLETTER_URL + "/send",
        payload
      );

      if (response?.data?.error === false) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "success",
            title: "Newsletter Added",
            desc: "Newsletter have been added successfully!",
            payload: null,
          })
        );

        dispatch(getNewsletters(`?page=${1}&limit=${10}`));

        router.push("/admin/newsletter");
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
          desc: "Something's wrong, please try again",
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

  return (
    <div className="fasta-form-div">
      <form onSubmit={submitForm}>
        <div className="row mt-5">
          {/* <div className="col-md-8 mr-auto mt-1 mb-4">
            <div className="form-group">
              <input
                type="file"
                ref={manyImage}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />

              <label htmlFor="">Add Image</label>
              <div className="documents_div">
                {selectedImage !== "" && (
                  <div className="documents_div_items">
                    <div
                      className="removeIcon"
                      onClick={() => removeImageDocs()}
                    >
                      <BiX />
                    </div>
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
              {selectedImage === "" && (
                <div
                  onClick={triggerImageInput}
                  className={`mt-5 choose_file ${
                    selectedImage ? "text-center" : "text-left"
                  }`}
                >
                  <BiCloudUpload size={100} color="#d8d8d8" />

                  <span style={{ fontSize: 13 }}>Click to Upload</span>
                </div>
              )}
            </div>
          </div> */}
          <div className="col-md-7 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Image Url</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </div>
          </div>
          <div className="col-md-7 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </div>
          </div>
          <div className="col-md-7 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Audience</label>

              <select
                value={audience}
                onChange={(e) => {
                  if (e.target?.value === "") {
                    return;
                  }

                  setAudience(e.target.value);
                }}
              >
                <option value="">Select audience</option>
                <option value="investor">investor</option>
              </select>
            </div>
          </div>
          <div className="col-md-7 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                placeholder="link"
              />
            </div>
          </div>

          {/* <div className="col-md-8 mt-1 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Select receipients</label>
              <div className="form_grid_tags">
                {receipients?.map((receipient) => (
                  <div
                    key={receipient}
                    onClick={() => selectReceipient(receipient)}
                    className={`form_grid_tag ${
                      selectedReceipients.includes(receipient) && "selected"
                    }`}
                  >
                    {receipient}
                  </div>
                ))}

              </div>
            </div>
          </div>
          <div className="col-md-8 mt-1 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Select Parameter</label>
              <div className="form_grid_tags">
                {parameters?.map((parameter: string) => (
                  <div
                    key={parameter}
                    onClick={() => selectParamter(parameter)}
                    className={`form_grid_tag ${
                      selectedParameters.includes(parameter) && "selected"
                    }`}
                  >
                    {parameter}
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <div className="col-md-7 mt-3 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Description</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols={30}
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="col-md-7 mt-3 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Text Content</label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                cols={30}
                rows={10}
              ></textarea>
            </div>
          </div>
          {/* <div className="col-md-7 mt-3 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Description</label>
              <TinyMCEEditor onChange={handleChange} />
            </div>
          </div> */}
          <div className="col-md-7 mt-1 mr-auto">
            <div className="form-check form-switch">
              <input
                onChange={handleSwitchToggle}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={isOn}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Should Send?
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mr-auto">
            <div className="form-group mt-5 button_group">
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

export default AddNotificationForm;
