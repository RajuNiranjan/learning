import { useEffect, useState } from "react";

export const useMobile = (breakPoint = 768) => {
  const [isMobile, setIsmobile] = useState(window.innerWidth < breakPoint);

  const handleResize = () => {
    const checkPoint = window.innerWidth < breakPoint;
    setIsmobile(checkPoint);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [isMobile];
};
