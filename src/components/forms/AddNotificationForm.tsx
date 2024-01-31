"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BiCloudUpload } from "react-icons/bi";

import { BiX } from "react-icons/bi";

interface ImageTypes {
  id: number;
  url: string;
  name: string;
}

interface ImageProperties {
  id: number;
  url: string;
  imageProperty: File | undefined;
}

const AddNotificationForm = () => {
  const manyImage = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const [receipients] = useState<string[]>(["Users", "Riders", "Fleet owners"]);
  const [parameters] = useState<string[]>([
    "All Users that are inactive",
    "All Users that are that have not added a card",
    "All Users that are that Don’t have money in their wallet",
  ]);

  const [selectedReceipients, setSelectedReceipients] = useState<string[]>([
    "Users",
  ]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [documentFile, setDocumentFile] = useState<ImageProperties[]>([]);

  const selectReceipient = (receipient: any) => {
    let selected = selectedReceipients.find(
      (oldReceipeint) => oldReceipeint === receipient
    );
    if (selected) {
      setSelectedReceipients((items) =>
        items.filter((item) => item !== receipient)
      );
    } else {
      setSelectedReceipients((items) => [...items, receipient]);
    }
  };

  const triggerImageInput = () => {
    manyImage?.current?.click();
  };

  // useEffect(() => {
  //   console.log("images", images);
  // }, [images]);

  const changeManyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentFile([]);
    let files: FileList | null;

    files = (e.target as HTMLInputElement)?.files;
    if (files) {
      const _files = Array.from(files);
      let prev = [...images, ..._files];
      setImages(prev);

      // console.log("prev", prev);
    }
  };

  const selectParamter = (parameter: string) => {
    let selected = selectedParameters.find(
      (oldParameter) => oldParameter === parameter
    );
    if (selected) {
      setSelectedParameters((items) =>
        items.filter((item) => item !== parameter)
      );
    } else {
      setSelectedParameters((items) => [...items, parameter]);
    }
  };

  const removeImageDocs = (file: File) => {
    // console.log(file);
    setImages((imagesFiles) =>
      imagesFiles.filter((item: any) => item?.name !== file?.name)
    );
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="fasta-form-div">
      <form onSubmit={submitForm}>
        <div className="row mt-5">
          <div className="col-md-8 mr-auto mt-1 mb-4">
            <div className="form-group">
              <input
                type="file"
                multiple
                ref={manyImage}
                style={{ display: "none" }}
                onChange={changeManyImage}
              />

              <label htmlFor="">Add Images</label>
              <div className="documents_div">
                {images &&
                  images.map((file, index) => {
                    const src = URL.createObjectURL(file);
                    return (
                      <div className="documents_div_items" key={index}>
                        <div
                          className="removeIcon"
                          onClick={() => removeImageDocs(file)}
                        >
                          <BiX />
                        </div>
                        {/* <i
                          className="bx bx-x"
                          onClick={() => removeImageDocs(file)}
                        ></i> */}

                        <Image width={100} height={100} src={src} alt="" />
                      </div>
                    );
                  })}
              </div>

              <div
                onClick={triggerImageInput}
                className={`mt-5 choose_file ${
                  documentFile.length ? "text-center" : "text-left"
                }`}
              >
                <BiCloudUpload size={100} color="#d8d8d8" />

                <span style={{ fontSize: 13 }}>Click to Upload</span>
              </div>
            </div>
          </div>
          <div className="col-md-7 mt-1 mr-auto">
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Service Notification"
              />
            </div>
          </div>
          <div className="col-md-8 mt-1 mb-4 mr-auto">
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

                {/* <div className="form_grid_tag">Riders</div>
            <div className="form_grid_tag selected">Customers</div>
            <div className="form_grid_tag">Fleet owners</div>
            <div className="form_grid_tag">Merchants</div> */}
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
          </div>
          <div className="col-md-7 mt-1 mb-4 mr-auto">
            <div className="form-group">
              <label htmlFor="">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols={30}
                rows={10}
              ></textarea>
            </div>
          </div>

          <div className="col-md-6 mr-auto">
            <div className="form-group mt-5 button_group">
              <button
                disabled={emptyFields}
                type="button"
                className="fasta_outline_button"
              >
                Save as Draft
              </button>
              <button
                disabled={emptyFields}
                type="submit"
                className="fasta_button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNotificationForm;
