import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

export const QrCodePlugin = (props) => {
  useEffect(() => {
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, {
      qrbox: props.qrBox,
      fps: props.fps,
      disableFlip: props.disableFlip,
      aspectRatio: props.aspectRatio,
      showTorchButtonIfSupported: true,
      videoConstraints: {
        facingMode: "environment",
      },
    });
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );
 
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div style={{ height: "100%", width: "100%" }} id={qrcodeRegionId} />;
};
