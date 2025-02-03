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

import { useState, useEffect, useRef } from "react";
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
  BarcodeFormat,
} from "@zxing/library";
import { MonitorStop, TvMinimalPlay } from "lucide-react";

import QrScanner from "qr-scanner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    borrow_date: "",
    etc_return: "",
  },
  {
    mtrl_code: "88765432-002",
    name: "Vải B",
    isUsing: true,
    location: "AA-01",
    borrowed: false,
    user_borrow: "",
    borrow_date: "",
    etc_return: "",
  },
  {
    mtrl_code: "24681357-001",
    name: "Vải F",
    isUsing: false,
    location: "",
    borrowed: false,
    user_borrow: "",
    borrow_date: "",
    etc_return: "",
  },
  {
    mtrl_code: "11223344-002",
    name: "Vải D",
    isUsing: true,
    location: "BB-01",
    borrowed: true,
    user_borrow: "pham huynh",
    borrow_date: "2024-12-24",
    etc_return: "2025-01-28",
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

  const onScan = (data: any) => {
    console.log("on scan success", data);
  };

  const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>(
    undefined
  );
  const qrScannerRef = useRef<HTMLVideoElement>(null);
  const [qrScannerInstance, setQrScannerInstance] = useState<QrScanner | null>(
    null
  );

  const [statusCamera, setStatusCamera] = useState<boolean>(false);

  useEffect(() => {
    QrScanner.listCameras()
      .then((cameras) => {
        setCameras(cameras);
        const rearCamera = cameras.find(
          (camera: any) => camera.facing === "environment"
        );

        console.log("list cameras", cameras);
        setSelectedCamera(
          rearCamera
            ? rearCamera.id
            : cameras.length > 0
            ? cameras[0].id
            : undefined
        );
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách camera:", error);
        toast.error("Không thể truy cập camera.");
      });

    return () => {
      if (qrScannerInstance) {
        qrScannerInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (qrScannerRef.current && selectedCamera) {
      if (qrScannerInstance) {
        qrScannerInstance.destroy();
      }

      if (statusCamera === false) {
        return;
      }

      const scanner = new QrScanner(
        qrScannerRef.current,
        (result: QrScanner.ScanResult) => {
          if (onScan) {
            onScan(result.data); // Truy cập data từ result
          }
        },
        {
          preferredCamera: selectedCamera,
        }
      );

      scanner
        .start()
        .then(() => {
          setQrScannerInstance(scanner);
        })
        .catch((e) => console.error("Error starting scanner", e));
    }
  }, [selectedCamera, cameras, statusCamera]);

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("pick camera");
    setSelectedCamera(event.target.value);
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
            <div className="grid gap-4">
              <div className="container mx-auto p-1">
                <div className="flex flex-col items-center">
                  <div className="w-full mb-4">
                    <div>
                      {cameras.length && (
                        <div>
                          <label htmlFor="cameraSelect">Chọn camera:</label>
                          <select
                            id="cameraSelect"
                            value={selectedCamera}
                            onChange={handleCameraChange}
                          >
                            {cameras.map((camera) => (
                              <option key={camera.id} value={camera.id}>
                                {camera.label || `Camera ${camera.id}`}
                              </option>
                            ))}

                            <option value="1">123</option>
                          </select>
                        </div>
                      )}
                      <video
                        ref={qrScannerRef}
                        style={{ width: "100%" }}
                      ></video>
                      <div>
                        <Button
                          onClick={() => setStatusCamera((prev) => !prev)}
                        >
                          {statusCamera ? "Turn Off" : "Turn On"}
                        </Button>
                      </div>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScanQrDialog;
