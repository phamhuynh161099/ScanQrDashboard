import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const ScanQrV2 = () => {
  const [result, setResult] = useState('');
  const videoRef = useRef<any>(null);
  const codeReaderRef = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    return () => {
    //   codeReaderRef.current.; // Reset the code reader when the component unmounts
    };
  }, []);

  const handleScan = async () => {
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      if (devices.length > 0) {
        const selectedDeviceId = devices[0].deviceId; // Select the first camera

        codeReaderRef.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error, controls) => {
          if (result) {
            setResult(result.getText());
          }
          if (error) {
            // console.error(error); // Log the error, but don't throw it
          }
        });
      }
    } catch (err) {
      console.error("Error during scanning:", err);
    }
  };

  return (
    <div>
      <button onClick={handleScan}>Start Scan</button>
      <video ref={videoRef} width="300" height="200"></video>
      <p>Scanned Code: {result}</p>
    </div>
  );
};

export default ScanQrV2;