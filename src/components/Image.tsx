"use client";

import React, { useEffect, useState } from "react";
import ImageNext, { ImageProps, StaticImageData } from "next/image";
import images from "@/assets/images";

interface ImagePropsExtended extends ImageProps {
  fallback?: StaticImageData;
}

const Image = ({
  src,
  alt = "Image",
  className,
  fallback = images.fallBack,
  loading = "lazy",
  style,
  onLoad,
  onError,
  ...props
}: ImagePropsExtended) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImgSrc(fallback);
    if (onError) {
      onError(event);
    }
  };

  const validSrc = imgSrc || fallback;

  return (
    <ImageNext
      src={validSrc}
      alt={alt}
      className={className}
      loading={loading}
      style={style}
      onLoad={onLoad}
      onError={handleError}
      quality={100}
      {...props}
    />
  );
};

Image.displayName = "Image";
export default Image;
