import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Printer, X } from "lucide-react";

interface ScanQrDialogProps {
  open: boolean;
  data: any[];
  haldleOpenPrintQrPreviewDialog: (value: any) => void;
}

const PrintQrPreviewDialog = ({
  open,
  data,
  haldleOpenPrintQrPreviewDialog,
}: ScanQrDialogProps) => {

  const barcodeContainerRef = useRef<any>(null);
  const [codeList, setCodeList] = useState<any[]>(data);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("run>>", data, codeList);
      setCodeList(data);
      generateBarcodes(codeList);
    }
  });

  //* func close preview dialog
  const handleOnChangeOpen = (value: any) => {
    haldleOpenPrintQrPreviewDialog(value);
  };

  function generateBarcodes(codes: any) {
    if (!barcodeContainerRef.current) return;
    barcodeContainerRef.current.innerHTML = "";

 
    codes.forEach((code: any) => {
      let templateBarcode = `
      <div className="min-h-28 bg-sky-400 flex">
        <div className="basis-1/2">
          <canvas id="qrcode-123456789-001" height="250" width="250" style="height: 250px; width: 250px;"></canvas>
        </div>

        <div className="p-1">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              123456789-001
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
              ...
          </p>
        </div>

      </div>
      `;

      const mainDiv = document.createElement("div");
      mainDiv.classList.add(
        "min-h-28",
        "bg-sky-400",
        "flex",
        "flex-col",
        "sm:flex-row",
        "border",
      );

      // Tạo div con thứ nhất (chứa canvas)
      const canvasDiv = document.createElement("div");
      canvasDiv.classList.add("basis-1/2");

      // Tạo canvas cho QR code
      const qrCanvas = document.createElement("canvas");
      qrCanvas.id = `qrcode-${code}`;
      canvasDiv.appendChild(qrCanvas);
      // Tạo QR code
      QRCode.toCanvas(
        qrCanvas,
        code,
        {
          width: 150,
          margin: 1,
          errorCorrectionLevel: "H",
        },
        (error: any) => {
          if (error) console.error(error);
          console.log("success!", code);
        }
      );
      mainDiv.appendChild(canvasDiv);

      // Tạo div con thứ nhất (chứa canvas)
      const inforDiv = document.createElement("div");
      inforDiv.classList.add(
        "basis-1/2",
        "p-1"
      );

      // Tạo tiêu đề h5
      const title = document.createElement("h5");
      title.classList.add(
        "mb-2",
        "text-xl",
        "font-bold",
        "tracking-tight",
        "text-gray-900",
        "dark:text-white"
      );
      title.textContent = `${code}`;
      inforDiv.appendChild(title);
      mainDiv.appendChild(inforDiv)


      barcodeContainerRef.current.appendChild(mainDiv);
    });

  }

  return (
    <>
      {open && (
        <>
          <div className="absolute top-1 w-[calc(100%-16px)] min-h-[calc(100vh-5rem)] px-4 py-2 bg-gray-300 shadow-lg dark:bg-gray-800 rounded-xl">
            <style>{styles}</style>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold ">QR Codes Preview</h1>
              <X
                className="size-10 cursor-pointer"
                onClick={() => handleOnChangeOpen(false)}
              />
            </div>

            <div className="mt-2">
              <button
                onClick={() => window.print()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2"
              >
                <Printer />
                Print QR Codes
              </button>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2" ref={barcodeContainerRef} id="barcode-container">
              <div className="min-h-28 bg-sky-400 flex flex-col">
                <div className="basis-1/2">

                </div>
                <div className="p-1">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    123456789-001
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    ...
                  </p>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

const styles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #barcode-container,
    #barcode-container * {
      visibility: visible;
    }
  }
`;

export default PrintQrPreviewDialog;
