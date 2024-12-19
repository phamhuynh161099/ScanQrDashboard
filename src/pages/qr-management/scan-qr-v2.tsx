import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';

const ScanQrV2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  // Sửa type của devices thành MediaDeviceInfo[]
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices: MediaDeviceInfo[]) => {
        // Không cần ép kiểu videoInputDevices nữa
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
  };

  const startScanning = () => {
    if (selectedDeviceId && videoRef.current) {
      const codeReader = new BrowserMultiFormatReader();

      // Thêm tùy chọn hints để cấu hình cho việc quét mã QR
      const hints = new Map<DecodeHintType, any>();
      hints.set(DecodeHintType.TRY_HARDER, true); // Tùy chọn này giúp quét chính xác hơn, nhưng có thể chậm hơn
      // hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]); // Chỉ định rõ chỉ quét mã QR, nếu bạn chỉ cần quét QR code

      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result: Result | undefined, err?: Error) => {
          if (result) {
            console.log("Kết quả quét mã:", result.getText());
            alert("Kết quả quét mã: " + result.getText());
            codeReader.reset();
          }
          if (err) {
            console.error("Lỗi khi quét mã:", err);
          }
        }
      );
    }
  };

  return (
    <div>
      <select className="min-w-14" onChange={handleDeviceChange} value={selectedDeviceId}>
        {devices.map((device: MediaDeviceInfo) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>

      <video
        ref={videoRef}
        width="600"
        height="400"
        style={{ border: "1px solid gray" }}
      ></video>
      <button onClick={startScanning}>Bắt đầu quét</button>
    </div>
  );
};

export default ScanQrV2;
