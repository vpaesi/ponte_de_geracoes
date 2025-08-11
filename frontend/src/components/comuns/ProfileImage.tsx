import React, { useState, useEffect } from "react";
import genericIcon from "../../assets/generic-icon.jpg";

interface ProfileImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  fallbackSrc?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  fallbackSrc = genericIcon,
  size = "md",
}) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
    "2xl": "w-40 h-40",
  };

  const loadingSpinnerSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
  };

  useEffect(() => {
    if (!src) {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
    };

    const fullSrc = src.startsWith("http")
      ? src
      : `http://localhost:8080${src}`;
    img.src = fullSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  const handleImageError = () => {
    if (!hasError) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const finalClassName = `
    ${width && height ? "" : sizeClasses[size]} 
    rounded-full 
    object-cover 
    ${isLoading ? "opacity-50" : "opacity-100"} 
    transition-opacity duration-300 
    ${className}
  `.trim();

  const imageProps = {
    src: imageSrc,
    alt,
    className: finalClassName,
    onError: handleImageError,
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div
      className={`relative ${
        width && height ? "" : sizeClasses[size]
      } rounded-full overflow-hidden`}
    >
      <img {...imageProps} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
          <div
            className={`${loadingSpinnerSizes[size]} border-2 border-primary-500 border-t-transparent rounded-full animate-spin`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
