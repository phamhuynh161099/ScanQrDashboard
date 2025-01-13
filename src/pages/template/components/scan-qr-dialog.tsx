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

interface ScanQrDialogProps {
  open: boolean;
  haldleOpenScanQrDialog: (value: any) => void;
  submitTakeNewMtrl2Location: (value: any) => void;
  parentPage: string;
}

const fakeDataScan = [
  {
    mtrl_code: "88765432-001",
    name: "Vải B",
    isUsing: true,
    location: "AA-01",
    borrowed: false,
    user_borrow: "",
    borrow_date : '',
    etc_return : ''
  },
  {
    mtrl_code: "88765432-002",
    name: "Vải B",
    isUsing: true,
    location: "AA-01",
    borrowed: false,
    user_borrow: "",
    borrow_date : '',
    etc_return : ''
  },
  {
    mtrl_code: "24681357-001",
    name: "Vải F",
    isUsing: false,
    location: "",
    borrowed: false,
    user_borrow: "",
    borrow_date : '',
    etc_return : ''
  },
  {
    mtrl_code: "11223344-002",
    name: "Vải D",
    isUsing: true,
    location: "BB-01",
    borrowed: true,
    user_borrow: "pham huynh",
    borrow_date : '2024-12-24',
    etc_return : '2025-01-28'
  },
];

const ScanQrDialog = ({
  open,
  haldleOpenScanQrDialog,
  submitTakeNewMtrl2Location,
  parentPage,
}: // submitTakeNewMtrl2Location,
ScanQrDialogProps) => {
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

  const [scannedData, setScannedData] = useState<any>();
  /**
   * isModeScan = true => Hien thi camera to scan
   */
  const [isModeScan, setIsModeScan] = useState<boolean>(true);

  /**
   * Sẽ trigger khi isModeScan thay đổi
   */
  useEffect(() => {
    codeReader.current
      .getVideoInputDevices()
      .then((videoInputDevices: MediaDeviceInfo[]) => {
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
          // Bắt đầu quét tự động nếu tìm thấy camera
          // setScanning(true);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });

    return () => {
      codeReader.current.reset();
    };
  }, [isModeScan]);

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

            // tam an chuc nang nay
            //setShowResult(true); // Hiển thị kết quả
            setScanning(false); // Dừng quét

            // chuyen qua mode show thong tin
            setIsModeScan(false);

            let _scannedData = fakeDataScan.find((val) => {
              if (val.mtrl_code === resultText) {
                return val;
              }
            });
            setScannedData(_scannedData);
          }
          if (err) {
            console.error("Lỗi khi quét mã:", err);
          }
        }
      );
    } else {
      codeReader.current.reset();
    }
  }, [isModeScan, scanning, selectedDeviceId]);

  // const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedDeviceId(event.target.value);
  //   setScanning(true); // Bắt đầu quét khi chọn camera mới
  // };

  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
    setScanning(true); // Bắt đầu quét khi chọn camera mới
  };

  const handleStartScan = () => {
    setScanning(true);
    setShowResult(false); // Ẩn kết quả cũ
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
          className="max-w-full max-h-[100vh] rounded-lg md:w-[500px] p-3"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Scan In</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {isModeScan && (
              <>
                <div className="grid gap-4">
                  <div className="container mx-auto p-1">
                    <div className="flex flex-col items-center">
                      <div className="w-full  mb-4">
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
                      <div className="w-full  relative">
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
                        <div className="mt-4 w-full ">
                          <h2 className="text-lg font-semibold mb-2">
                            Kết quả:
                          </h2>
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
              </>
            )}

            {/* Khi Scan Success */}
            {!isModeScan && scannedData && (
              <>
                {scannedData && scannedData.isUsing === true ? (
                  <>
                    {" "}
                    <div className="w-full">
                      <p className="text-2xl font-semibold">Scan Result</p>

                      <div className="w-full min-h-[100px] bg-gray-400 rounded-xl shadow-xl relative p-2">
                        <div className="w-full rounded overflow-hidden shadow-lg">
                          <img
                            className="w-full h-40 bg-white"
                            src="https://placehold.co/600x400"
                            alt="Placeholder Image"
                          />
                          <div className="p-2">
                            <div className="text-xl mb-1">
                              Code:{" "}
                              <span className="font-bold">
                                {scannedData.mtrl_code}
                              </span>
                            </div>
                            <p className="text-gray-700 text-base line-clamp-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Phasellus ac pretium diam.
                            </p>
                          </div>
                          <div className="p-2 pb-2">
                            <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              Not Available | {scannedData.location}
                            </span>

                            {/* <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          Available
                        </span> */}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex justify-center space-x-1">
                        {parentPage !== "scanIn" && (
                          <Button
                            onClick={() => {
                              console.log("scannedData", scannedData);
                              submitTakeNewMtrl2Location(scannedData);
                              handleOnChangeOpen(false);
                            }}
                          >
                            Submit
                          </Button>
                        )}

                        <Button
                          onClick={() => {
                            setScannedData(null);
                            setIsModeScan(true);
                          }}
                        >
                          Scan Again
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="w-full">
                      <p className="text-2xl font-semibold">Scan Result</p>

                      <div className="w-full min-h-[100px] bg-green-400 rounded-xl shadow-xl relative p-2">
                        <div className="w-full rounded overflow-hidden shadow-lg">
                          <img
                            className="w-full h-40 bg-white"
                            src="https://placehold.co/600x400"
                            alt="Placeholder Image"
                          />
                          <div className="p-2">
                            <div className="text-xl mb-1">
                              Code:{" "}
                              <span className="font-bold">
                                {scannedData.mtrl_code}
                              </span>
                            </div>
                            <p className="text-gray-700 text-base line-clamp-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Phasellus ac pretium diam.
                            </p>
                          </div>
                          <div className="p-2 pb-2">
                            <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              Available
                            </span>

                            {/* <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          Available
                        </span> */}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex justify-center space-x-1">
                        <Button
                          onClick={() => {
                            console.log("scannedData", scannedData);
                            submitTakeNewMtrl2Location(scannedData);
                            handleOnChangeOpen(false);
                          }}
                        >
                          Submit
                        </Button>
                        <Button onClick={() => setIsModeScan(true)}>
                          Scan Again
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {/* Khi Scan Success */}
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScanQrDialog;
