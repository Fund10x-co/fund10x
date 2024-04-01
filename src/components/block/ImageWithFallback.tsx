import React, { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  [key: string]: any; // for additional props
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt="image"
      unoptimized
    />
  );
};

export default ImageWithFallback;
