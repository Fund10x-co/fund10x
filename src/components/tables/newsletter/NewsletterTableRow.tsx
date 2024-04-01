import { newsletterType } from "@/types/types";
import Image from "next/image";
import React from "react";
import ActionButton from "./ActionButton";
import { removeFormatDate } from "@/utils/helpers/globalFunc";
import ImageWithFallback from "@/components/block/ImageWithFallback";
import { formateDayMonth } from "@/utils/helpers/customFunctions";

interface Props {
  index: number;
  item: newsletterType;
  // addCheckboxItems: () => {};
}
const NewsletterTableRow = ({ index, item }: Props) => {
  return (
    <tr>
      <td style={{ whiteSpace: "unset" }} colSpan={4}>
        <div className="width_img">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 40,
                paddingLeft: 10,
              }}
            >
              {item?.imageUrl ? (
                <ImageWithFallback
                  // layout="fill"
                  src={item?.imageUrl}
                  fallbackSrc={require("@/assets/img/sample.png")}
                  width={72}
                  height={72}
                />
              ) : (
                <Image
                  property={"false"}
                  src={require("@/assets/img/sample.png")}
                  alt=""
                  width={72}
                  height={72}
                />
              )}

              <div
                className="tableDiv"
                style={{ position: "relative", display: "block" }}
              >
                <p style={{ fontSize: 18, fontWeight: 700 }}>{item?.title}</p>
                <div
                  style={{
                    overflowWrap: "break-word",
                    display: "block",
                    wordBreak: "break-all",
                    fontSize: 15,
                    fontWeight: 300,
                  }}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `<div>${item?.textContent} </div>`,
                    }}
                    style={{ margin: 0 }}
                  ></p>
                  {/* {item?.textContent} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          {item?.audience}
        </div>
      </td>
      <td>
        {/* <div style={{ textAlign: "center" }}>
          
          <div style={{ width: 200 }}>
            <button
              type="button"
              className="site_button animate__animated animate__fadeInRight"
            >
              <span>Investor</span>
            </button>
          </div>
        </div> */}
        <div style={{ marginTop: 13, textAlign: "center" }}>
          <p
            style={{
              textAlign: "center",
            }}
          >
            {formateDayMonth(item.createdAt)}
          </p>
          <p
            style={{
              textAlign: "center",
            }}
            className={`isNormal ${item?.sent ? "isSent" : ""}`}
          >
            {item?.sent ? "Sent" : "Not sent"}
          </p>
        </div>
      </td>
      <td>
        <div style={{ marginTop: 15 }}>
          <ActionButton item={item} />
        </div>
      </td>
    </tr>
  );
};

export default NewsletterTableRow;
