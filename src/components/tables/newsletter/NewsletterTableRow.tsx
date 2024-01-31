import { Investors } from "@/types/tableTypes";
import Image from "next/image";
import React from "react";

interface Props {
  index: number;
  item: Investors;
  // addCheckboxItems: () => {};
}
const NewsletterTableRow = ({ index, item }: Props) => {
  return (
    <tr>
      <td style={{ whiteSpace: "unset" }} colSpan={4}>
        <div className="width_img">
          <input type="checkbox" />
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 40,
                paddingLeft: 10,
              }}
            >
              <Image
                property={"false"}
                src={require("@/assets/img/default.png")}
                alt=""
              />
              <div
                className="tableDiv"
                style={{ position: "relative", display: "block" }}
              >
                <p style={{ fontSize: 18, fontWeight: 700 }}>
                  Investment Update
                </p>
                <div
                  style={{
                    overflowWrap: "break-word",
                    display: "block",
                    wordBreak: "break-all",
                    fontSize: 15,
                    fontWeight: 300,
                  }}
                >
                  vamus. Consequat vel libero facilisis luctus enim pellentesque
                  mauris. Vestibulum malesuada gravida egestas in molestie sed.
                  Etiam viverra volutpat fames vulputate in tellus sit mauris.
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 400 }}>10/11/2023</p>
          <div style={{ width: 200 }}>
            <button
              type="button"
              className="site_button animate__animated animate__fadeInRight"
            >
              <span>Investor</span>
            </button>
          </div>
        </div>
      </td>
      <td></td>
    </tr>
  );
};

export default NewsletterTableRow;
