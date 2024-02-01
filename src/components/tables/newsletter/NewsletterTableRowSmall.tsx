import { newsletterType } from "@/types/types";
import { removeFormatDate } from "@/utils/helpers/globalFunc";
import Image from "next/image";
import React from "react";
import ActionButton from "./ActionButton";

interface Props {
  index: number;
  item: newsletterType;
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
      {item?.imageUrl ? (
        <Image
          property={"false"}
          src={item?.imageUrl}
          alt=""
          width={70}
          height={70}
          style={{
            marginLeft: 10,
          }}
        />
      ) : (
        <Image
          property={"false"}
          src={require("@/assets/img/default.png")}
          alt=""
          style={{
            width: 70,
            marginLeft: 10,
          }}
        />
      )}

      <div
        className="fasta_small_table_item_content"
        style={{ textAlign: "center", width: "100%" }}
      >
        <h4>{item?.title}</h4>
        <p>{item?.description}</p>
        <div style={{ textAlign: "center" }}>
          <p>{removeFormatDate(item.createdAt)}</p>
        </div>
        <div style={{ marginTop: 25 }}>
          <ActionButton item={item} />
        </div>
      </div>
    </div>
  );
};

export default NewsletterTableRowSmall;
