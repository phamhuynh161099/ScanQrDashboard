import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const ScanQrV2 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.getVideoInputDevices()
      .then((videoInputDevices) => {
        const selectedDeviceId = videoInputDevices[0].deviceId;

        codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
          if (result) {
            console.log('Kết quả quét mã:', result.getText());
            // Xử lý kết quả ở đây
            alert('Kết quả quét mã: ' + result.getText());
            codeReader.reset();
          }
          // Sửa lỗi ở đây, không cần dùng ZXing.NotFoundException
          if (err) {
            console.error('Lỗi khi quét mã:', err);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} width="600" height="400" style={{ border: '1px solid gray' }}></video>
    </div>
  );
};

export default ScanQrV2;