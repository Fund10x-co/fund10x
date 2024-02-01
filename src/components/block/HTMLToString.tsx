import React from "react";

interface HTMLToStringProps {
  htmlString: string;
}

function HTMLToString({ htmlString }: HTMLToStringProps) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default HTMLToString;
