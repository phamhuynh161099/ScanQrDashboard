import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader, DecodeHintType, Result, BarcodeFormat } from '@zxing/library';

const ScanQrV2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [scanResult, setScanResult] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false); // Thêm state để theo dõi trạng thái quét
  const [showResult, setShowResult] = useState<boolean>(false); // Thêm state để ẩn hiện kết quả
  const codeReader = useRef<BrowserMultiFormatReader>(new BrowserMultiFormatReader()); // Dùng useRef để giữ instance của BrowserMultiFormatReader

  useEffect(() => {

    codeReader.current.getVideoInputDevices()
      .then((videoInputDevices: MediaDeviceInfo[]) => {
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
          // Bắt đầu quét tự động nếu tìm thấy camera
          setScanning(true);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });

    return () => {
      codeReader.current.reset();
    };
  }, []);

  useEffect(() => {
    if (scanning && selectedDeviceId && videoRef.current) {
      // Thêm tùy chọn hints để cấu hình cho việc quét mã QR
      const hints = new Map<DecodeHintType, any>();
      hints.set(DecodeHintType.TRY_HARDER, true);
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.CODE_128,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
      ]);
  
      codeReader.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result: Result | undefined, err?: Error) => {
          if (result) {
            const resultText = result.getText();
            console.log('Kết quả quét mã:', resultText);
            setScanResult(resultText);
            setShowResult(true); // Hiển thị kết quả
            setScanning(false); // Dừng quét
          }
          if (err) {
            console.error('Lỗi khi quét mã:', err);
          }
        }
      );
    } else {
      codeReader.current.reset();
    }
  }, [scanning, selectedDeviceId]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
    setScanning(true); // Bắt đầu quét khi chọn camera mới
  };

  const handleStartScan = () => {
    setScanning(true);
    setShowResult(false); // Ẩn kết quả cũ
  };

  const handleStopScan = () => {
    setScanning(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(scanResult);
    alert("Đã sao chép kết quả vào clipboard!")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Quét mã QR Code</h1>

      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 mb-4">
          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleDeviceChange}
            value={selectedDeviceId}
          >
            {devices.map((device: MediaDeviceInfo) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full md:w-1/2 relative'>
          <video ref={videoRef} width="100%" className='rounded-lg' style={{ display: scanning ? 'block' : 'none' }}></video>
          {/* Nút điều khiển */}
          <div className="mt-4 flex gap-4 w-full absolute bottom-[-50px] left-0">
            {!scanning && (
                <button
                className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleStartScan}
                >
                Bắt đầu quét
                </button>
            )}
            {scanning && (
                <button
                className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleStopScan}
                >
                Dừng quét
                </button>
            )}
          </div>
        </div>

        {/* Kết quả */}
        {showResult && (
          <div className="mt-4 w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Kết quả:</h2>
            <div className="p-2 border border-gray-300 rounded bg-gray-100 break-words select-all">{scanResult}</div>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCopy}>
              Copy
            </button>
          </div>
        )}
        {/* Thông báo lỗi */}
        {!scanning && devices.length === 0 && (
          <div className="mt-4 text-red-500">Không tìm thấy camera.</div>
        )}
      </div>
    </div>
  );
};

export default ScanQrV2;
