import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const ScanQr = () => {
  const [result, setResult] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (res: any, err) => {
        if (res) {
          setResult(res.text);
        }
        if (err && !(err.name === "NotFoundException")) {
          console.error(err);
        }
      }
    );

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h1>Barcode/QR Code Scanner</h1>
      <video ref={videoRef} style={{ width: "100%" }} />
      <p>Scanned Result: {result}</p>
    </div>
  );
};

export default ScanQr;
