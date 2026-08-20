"use client";

import { useState } from "react";

interface CompanyLogoProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
}

export default function CompanyLogo({ src, alt, className = "" }: CompanyLogoProps) {
  const [imgSrc, setImgSrc] = useState(src || "/logo.png");

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
