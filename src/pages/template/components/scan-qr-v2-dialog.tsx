import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState, useEffect, useRef } from "react";
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
  BarcodeFormat,
} from "@zxing/library";
import { MonitorStop, TvMinimalPlay } from "lucide-react";
import * as Jimp from 'jimp';

interface ScanQrDialogProps {
  open: boolean;
  haldleOpenScanQrDialog: (value: any) => void;
}

const ScanQrV2Dialog = ({
  open,
  haldleOpenScanQrDialog,
}: ScanQrDialogProps) => {
  const handleOnChangeOpen = (value: any) => {
    haldleOpenScanQrDialog(value);
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [scanResult, setScanResult] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false); // Thêm state để theo dõi trạng thái quét
  const [showResult, setShowResult] = useState<boolean>(false); // Thêm state để ẩn hiện kết quả
  const codeReader = useRef<BrowserMultiFormatReader>(
    new BrowserMultiFormatReader()
  ); // Dùng useRef để giữ instance của BrowserMultiFormatReader

  useEffect(() => {
    codeReader.current
      .getVideoInputDevices()
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
            console.log("Kết quả quét mã:", resultText);
            setScanResult(resultText);
            setShowResult(true); // Hiển thị kết quả
            setScanning(false); // Dừng quét
          }
          if (err) {
            console.error("Lỗi khi quét mã:", err);
          }
        }
      );
    } else {
      codeReader.current.reset();
    }
  }, [scanning, selectedDeviceId]);

  // const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedDeviceId(event.target.value);
  //   setScanning(true); // Bắt đầu quét khi chọn camera mới
  // };

  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
    setScanning(true); // Bắt đầu quét khi chọn camera mới
  };

  const decodeFromCroppedImage = async (
    imageData: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const image = await Jimp.Jimp.read(imageData);
    const croppedImage = image.crop({x, y, w, h});
    const buffer = await croppedImage.getBuffer(Jimp.JimpMime.jpeg);
  
    const img = new Image();
    const blob = new Blob([buffer], { type: Jimp.JimpMime.jpeg });
    const url = URL.createObjectURL(blob);
    img.src = url;
  
    await new Promise((resolve) => {
      img.onload = resolve;
    });
  
    URL.revokeObjectURL(url);
  
    const result = await codeReader.current.decodeFromImage(img);
    return result;
  };

  const handleStartScan = () => {
    setScanning(true);
    setShowResult(false); // Ẩn kết quả cũ
    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: selectedDeviceId } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const overlay = document.querySelector(
              ".overlay"
            ) as HTMLDivElement;

            const scan = () => {
              if (!videoRef.current || !context) return;

              context.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height
              );
              const imageData = canvas.toDataURL("image/jpeg");

              // Lấy vị trí và kích thước của khung ngắm
              const rect = overlay.getBoundingClientRect();
              const videoRect = videoRef.current.getBoundingClientRect();
              const x = rect.left - videoRect.left;
              const y = rect.top - videoRect.top;
              const width = rect.width;
              const height = rect.height;

              decodeFromCroppedImage(imageData, x, y, width, height)
                .then((result: Result | undefined) => {
                  if (result) {
                    const resultText = result.getText();
                    console.log("Kết quả quét mã:", resultText);
                    setScanResult(resultText);
                    setShowResult(true); // Hiển thị kết quả
                    setScanning(false); // Dừng quét
                    stream.getTracks().forEach((track) => track.stop()); // Dừng stream camera
                  } else if (scanning) {
                    requestAnimationFrame(scan); // Tiếp tục quét nếu chưa tìm thấy
                  }
                })
                .catch((err) => console.error("Lỗi khi quét mã:", err));
            };
            if (scanning) {
              requestAnimationFrame(scan); // Bắt đầu quét
            }
          };
        }
      })
      .catch((err) => console.error("Lỗi khi truy cập camera:", err));
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scanResult);
    alert("Đã sao chép kết quả vào clipboard!");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOnChangeOpen}>
        <DialogContent
          className="max-w-full rounded-lg md:w-[500px] p-3"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Scan In</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="container mx-auto p-1">
              <div className="flex flex-col items-center">
                <div className="w-full md:w-1/2 mb-4">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Select Camera
                  </Label>
                  <Select
                    onValueChange={handleDeviceChange}
                    value={selectedDeviceId}
                  >
                    <SelectTrigger id="type_location">
                      <SelectValue placeholder="No Camera To Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {devices.map((device: MediaDeviceInfo) => (
                        <SelectItem
                          key={device.deviceId}
                          value={device.deviceId}
                        >
                          {device.label || `Camera ${device.deviceId}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-1/2 relative">
                  <video
                    ref={videoRef}
                    width="100%"
                    className="rounded-lg border-2"
                    // style={{ display: scanning ? "block" : "none" }}
                  ></video>
                  {/* Nút điều khiển */}
                  <div className="mt-4 flex gap-4 w-full bottom-[-50px] left-0">
                    {!scanning && (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-1 items-center"
                        onClick={handleStartScan}
                      >
                        <TvMinimalPlay /> Start Scan
                      </button>
                    )}
                    {scanning && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-1 items-center"
                        onClick={handleStopScan}
                      >
                        <MonitorStop /> Stop Scan
                      </button>
                    )}
                  </div>
                </div>

                {/* Kết quả */}
                {showResult && (
                  <div className="mt-4 w-full md:w-1/2">
                    <h2 className="text-lg font-semibold mb-2">Kết quả:</h2>
                    <div className="p-2 border border-gray-300 rounded bg-gray-100 break-words select-all">
                      {scanResult}
                    </div>
                    <button
                      className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleCopy}
                    >
                      Copy
                    </button>
                  </div>
                )}
                {/* Thông báo lỗi */}
                {!scanning && devices.length === 0 && (
                  <div className="mt-4 text-red-500">
                    Không tìm thấy camera.
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScanQrV2Dialog;
