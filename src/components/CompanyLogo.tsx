"use client";

import { useState, useEffect } from "react";

interface CompanyLogoProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
}

export default function CompanyLogo({ src, alt, className = "" }: CompanyLogoProps) {
  const [imgSrc, setImgSrc] = useState(src || "/logo.png");

  useEffect(() => {
    setImgSrc(src || "/logo.png");
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== "/logo.png") {
          setImgSrc("/logo.png");
        }
      }}
    />
  );
}
