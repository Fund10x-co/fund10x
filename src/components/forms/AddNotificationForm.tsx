"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCloudUpload } from "react-icons/bi";

import { BiX } from "react-icons/bi";
import { setAlertPopUp, setPageLoading } from "@/store/alertSlice/alertSlice";
import { axiosAuth } from "@/utils/config/axios";
import { BASEURL, GET_NEWSLETTER_URL } from "@/utils/config/urlConfigs";
import { useRouter } from "next/navigation";
import { getNewsletters } from "@/store/newsletterSlice/actions";
import { AppDispatch, RootState } from "@/store/store";
import {
  addLineBreak,
  htmlEmailTemp,
  removeDuplicate,
  removeLineBreak,
} from "@/utils/helpers/customFunctions";

const AddNotificationForm = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.oauth);

  const manyImage = useRef<HTMLInputElement>(null);
  const signatureImage = useRef<HTMLInputElement>(null);
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
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [uploadedSignature, setUploadedSignature] = useState<any | null>(null);
  const [uploadedSignaturePreview, setUploadedSignaturePreview] =
    useState<string>("");
  const [convertedImageURL, setConvertedImageURL] = useState<any[]>([]);
  const [imageCovtURL, setImageConvtURL] = useState<string>("");
  const [sigCovtURL, setSigConvtURL] = useState<string>("");

  const resetFields = () => {
    setImageUrl("");
    setTitle("");
    setAudience("");
    setLink("");
    setMessage("");
    setIsOn(true);
    setEmptyFields(true);
    setSelectedImage("");
    setUploadedSignaturePreview("");
    setSelectedFile(null);
    setUploadedSignature(null);
    setConvertedImageURL([]);
    setImageConvtURL("");
    setSigConvtURL("");
  };

  // const [receipients] = useState<string[]>(["Users", "Riders", "Fleet owners"]);
  // const [parameters] = useState<string[]>([
  //   "All Users that are inactive",
  //   "All Users that are that have not added a card",
  //   "All Users that are that Don’t have money in their wallet",
  // ]);

  // const [selectedReceipients, setSelectedReceipients] = useState<string[]>([
  //   "Users",
  // ]);

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

  const triggerSignatureImageInput = () => {
    signatureImage?.current?.click();
  };

  // useEffect(() => {
  //   console.log("images", images);
  // }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    convertImageToUrl(file, "IMAGE");
  };

  const handleSignatureImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];

    setUploadedSignature(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedSignaturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    convertImageToUrl(file, "SIGN");
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
  }, [
    title,
    link,
    audience,
    selectedFile,
    imageUrl,
    message,
    textContent,
    uploadedSignature,
    emptyFields,
  ]);

  const validateForms = () => {
    if (!selectedFile) {
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

    if (audience === "") {
      setEmptyFields(true);
      return;
    }

    if (message === "") {
      setEmptyFields(true);
      return;
    }

    if (!uploadedSignature) {
      setEmptyFields(true);
      return;
    }

    setEmptyFields(false);
  };

  const convertImageToUrl = (imageFile: any, type: string) => {
    const url = "https://api.cloudinary.com/v1_1/hzxyensd5/image/upload";

    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("upload_preset", "docs_upload_example_us_preset");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (type === "IMAGE") {
            setImageConvtURL(data?.secure_url);
          }
          if (type === "SIGN") {
            setSigConvtURL(data?.secure_url);
          }
        }
      });
  };
  // console.log("selectedImage", selectedImage);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmitToBackend();

    // if (convertedImageURL?.length <= 0) {
    //   let allConverts: any = [];
    //   const formData = new FormData();

    //   let files = [selectedFile, uploadedSignature];

    //   // allFiles?.forEach((file) => {
    //   //   formData.append("file", file);
    //   // })

    //   console.log("files", files);
    //   const url = "https://api.cloudinary.com/v1_1/hzxyensd5/image/upload";

    //   for (let i = 0; i < files.length; i++) {
    //     let file = files[i];
    //     formData.append("file", file);
    //     formData.append("upload_preset", "docs_upload_example_us_preset");

    //     fetch(url, {
    //       method: "POST",
    //       body: formData,
    //     })
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //         allConverts.push(data);
    //         console.log("data", data);
    //         let newASrry = [...convertedImageURL, data];

    //         console.log("newASrry", newASrry);

    //         let newASrryDupl = removeDuplicate(newASrry);

    //         console.log("newASrryDupl", newASrryDupl);
    //         setConvertedImageURL(allConverts);

    //         if (newASrryDupl?.length == 2) {
    //           handleSubmitToBackend();
    //         }
    //       });
    //   }

    //   if (allConverts?.length === 2) {
    //     console.log("allConverts", allConverts);
    //   }

    //   //
    // } else {

    // }
  };

  // console.log("message", message);

  const handleSubmitToBackend = async () => {
    if (sigCovtURL === "") {
      alert("please wait we convert this image.. Try again in 5sec");

      return;
    }

    dispatch(
      setPageLoading({
        status: true,
        message: "Adding newsletter...",
      })
    );

    let newHTMLDiv = htmlEmailTemp(imageCovtURL, sigCovtURL, title, message);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();

    formdata.append("audience", audience);
    formdata.append("title", title);
    formdata.append("link", link);
    formdata.append("textContent", `${message}`);
    formdata.append("htmlContent", String(newHTMLDiv));
    formdata.append("imageUrl", imageCovtURL);
    formdata.append("signatureImageUrl", sigCovtURL);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const uRL = BASEURL + GET_NEWSLETTER_URL + "/send";
    // console.log("uRL", uRL);

    fetch(`${uRL}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        if (data?.error === false) {
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

          resetFields();
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "error",
              title: "Newsletter Not Added",
              desc: "Error occurred while adding newsletter",
              payload: null,
            })
          );
        }

        // console.log("data", data);
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        dispatch(
          setAlertPopUp({
            status: true,
            type: "error",
            title: "Error",
            desc: String(error),
            payload: null,
          })
        );

        // console.log("error", error);
      });

    // let payload = {
    //   audience: audience,
    //   title: title,
    //   link: link,
    //   textContent: `<div>${message}</div>`,
    //   htmlContent: String(newHTMLDiv),
    //   imageUrl: imageCovtURL,
    //   signatureImageUrl: sigCovtURL,
    // };

    // console.log("payload", payload);

    // try {
    //   const response = await axiosAuth.post(
    //     GET_NEWSLETTER_URL + "/send",
    //     payload
    //   );

    //   if (response?.data?.error === false) {
    //     dispatch(
    //       setAlertPopUp({
    //         status: true,
    //         type: "success",
    //         title: "Newsletter Added",
    //         desc: "Newsletter have been added successfully!",
    //         payload: null,
    //       })
    //     );

    //     dispatch(getNewsletters(`?page=${1}&limit=${10}`));

    //     resetFields();

    //     // router.push("/admin/newsletter");
    //   } else {
    //     dispatch(
    //       setAlertPopUp({
    //         status: true,
    //         type: "error",
    //         title: "Admin Not Added",
    //         desc: "Error occurred while adding Admin",
    //         payload: null,
    //       })
    //     );
    //   }
    // } catch (error: any) {
    //   // console.log("error", error);
    //   let message = error?.response?.data?.errors[0];
    //   dispatch(
    //     setAlertPopUp({
    //       status: true,
    //       type: "error",
    //       title: "Error",
    //       desc: message || "Something's wrong, please try again",
    //       payload: null,
    //     })
    //   );
    // }

    // dispatch(
    //   setPageLoading({
    //     status: false,
    //     message: "",
    //   })
    // );
  };

  return (
    <>
      <div className="fasta-form-div" style={{ width: "100%" }}>
        <div className="newsletterCardColRow">
          <div className="newsletterCardCol ">
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="col-md-8 mr-auto mt-1 mb-4">
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
                </div>
                {/* <div className="col-md-12 mt-1">
            <div className="form-group">
              <label htmlFor="">Image Url</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </div>
          </div> */}
                <div className="col-md-12 mt-1">
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
                <div className="col-md-12 mt-1">
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
                      <option value="investor">Investor</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 mt-1">
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
                <div className="col-md-12 mt-3 mb-4 mr-auto">
                  <div className="form-group">
                    <label htmlFor="">Message</label>
                    <textarea
                      value={removeLineBreak(message)}
                      onChange={(e) => setMessage(addLineBreak(e.target.value))}
                      cols={30}
                      rows={10}
                      style={{ height: 240 }}
                    ></textarea>
                  </div>
                </div>
                {/* <div className="col-md-7 mt-3 mb-4 mr-auto">
                <div className="form-group">
                  <label htmlFor="">Text Content</label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    cols={30}
                    rows={10}
                  ></textarea>
                </div>
              </div> */}
                {/* <div className="col-md-7 mt-3 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Description</label>
              <TinyMCEEditor onChange={handleChange} />
            </div>
          </div> */}
                <div className="col-md-12 mt-1 mb-4 mr-auto">
                  <input
                    type="file"
                    ref={signatureImage}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleSignatureImageChange}
                  />
                  <div className="d-flex align-items-center">
                    <h6 style={{ margin: 0 }}>Signature</h6>
                    <button
                      type="button"
                      className="SmallButton"
                      onClick={triggerSignatureImageInput}
                    >
                      Upload +
                    </button>
                    <span style={{ marginLeft: 4, color: "gray" }}>
                      {uploadedSignature?.name}
                    </span>
                  </div>
                </div>
                {/* <div className="col-md-12 mt-1">
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
              </div> */}
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
          <div className=" newsletterCardCol">
            <div className="newsletterCard">
              <h4>Preview</h4>
              <div className=" card">
                <div className="card-body">
                  {selectedImage !== "" ? (
                    <div className="newsletterCardLargeImage">
                      <Image
                        src={selectedImage}
                        alt="Selected"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <div className="imagePlaceHolder">
                      <p>Sample</p>
                    </div>
                  )}

                  <h4>{title} </h4>
                  <p dangerouslySetInnerHTML={{ __html: message }}>
                    {/* {addLineBreak(message)} */}
                    {/* Welcome to the latest edition of our investment newsletter! In
                  the ever-evolving landscape of financial markets, we strive to
                  bring you insightful analysis and updates to help navigate
                  your investment journey. This month, we delve into emerging
                  trends shaping the global economy, offering expert
                  perspectives on sectors with potential for growth. From
                  sustainable investing to the latest market developments, our
                  goal is to equip you with the knowledge needed to make
                  informed decisions. Additionally, we highlight key economic
                  indicators and provide strategic tips to optimize your
                  investment portfolio. Stay informed, stay ahead – because your
                  financial success is our priority. Happy investing! FUND10X
                  Investment Team. */}
                  </p>

                  {uploadedSignaturePreview && (
                    <div className="mt-4 signaturePreviewImage">
                      <Image
                        src={uploadedSignaturePreview}
                        alt="Selected"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotificationForm;
