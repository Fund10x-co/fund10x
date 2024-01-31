import { Investors } from "@/types/tableTypes";
import Image from "next/image";
import React from "react";

interface Props {
  index: number;
  item: Investors;
  // addCheckboxItems: () => {};
}

const NewsletterTableRowSmall = ({ index, item }: Props) => {
  return (
    <div
      className="fasta_small_table_item"
      style={{
        display: "block",
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Image
        property={"false"}
        src={require("@/assets/img/default.png")}
        alt=""
        style={{
          width: 70,
          marginLeft: 10,
        }}
      />

      <div
        className="fasta_small_table_item_content"
        style={{ textAlign: "center", width: "100%" }}
      >
        <h4>Investment Update</h4>
        <p>
          vamus. Consequat vel libero facilisis luctus enim pellentesque mauris.
          Vestibulum malesuada gravida egestas in molestie sed. Etiam viverra
          volutpat fames vulputate in tellus sit mauris.{" "}
        </p>
        <div style={{ textAlign: "center" }}>
          <p>10/11/2023</p>
          <div>
            <button
              type="button"
              className="site_button animate__animated animate__fadeInRight"
            >
              <span>Investor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterTableRowSmall;
