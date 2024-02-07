import { useState, useEffect } from "react";

const useDeviceDetection = () => {
  const [device, setDevice] = useState("");
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice("Mobile");
        setIsMobile(true);
      } else if (isTablet) {
        setDevice("Tablet");
        setIsMobile(true);
      } else {
        setDevice("Desktop");
        setIsMobile(false);
      }
    };

    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return { device, isMobile };
};

export default useDeviceDetection;
