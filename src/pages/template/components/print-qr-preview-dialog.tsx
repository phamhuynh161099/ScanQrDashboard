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
  const handleOnChangeOpen = (value: any) => {
    haldleOpenPrintQrPreviewDialog(value);
  };

  const barcodeContainerRef = useRef<any>(null);

  const [codeList, setCodeList] = useState<any[]>(data);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("run>>", data, codeList);
      setCodeList(data);
      generateBarcodesV2(codeList);
    }
  });

  function generateBarcodesV2(codes: any) {
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
        "border",
      );

       // Tạo div con thứ nhất (chứa canvas)
      const canvasDiv = document.createElement("div");
      canvasDiv.classList.add("basis-1/2");

      // Tạo canvas cho QR code
      const qrCanvas = document.createElement("canvas");
      qrCanvas.id = `qrcode-${code}`;
      canvasDiv.appendChild(qrCanvas);
      // Tạo QR code sử dụng qrcode.js
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

      mainDiv.appendChild(canvasDiv)


      barcodeContainerRef.current.appendChild(mainDiv);
    });

    // barcodeContainerRef.current.appendChild(templateGroupBarcode);
  }

  function generateBarcodes(codes: any) {
    if (!barcodeContainerRef.current) return;
    barcodeContainerRef.current.innerHTML = "";

    const groupedCodes = [];
    for (let i = 0; i < codes.length; i += 2) {
      groupedCodes.push(codes.slice(i, i + 2));
    }

    groupedCodes.forEach((group: any) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList
        .add
        // "row-print" // Add class row-print here
        ();

      group.forEach((code: any) => {
        const barcodeDiv = document.createElement("div");
        barcodeDiv.classList.add(
          "barcode-item",
          "flex",
          "flex-col",
          "items-center"
          // "mx-2"
        );

        // Tạo canvas cho QR code
        const qrCanvas = document.createElement("canvas");
        qrCanvas.id = `qrcode-${code}`;

        const codeText = document.createElement("p");
        codeText.textContent = code;
        codeText.classList.add("code-text", "text-center");

        barcodeDiv.appendChild(qrCanvas);
        barcodeDiv.appendChild(codeText);
        rowDiv.appendChild(barcodeDiv);

        // Tạo QR code sử dụng qrcode.js
        QRCode.toCanvas(
          qrCanvas,
          code,
          {
            width: 250, // Kích thước QR code
            margin: 1, // Margin
            errorCorrectionLevel: "H", // Mức độ sửa lỗi (L, M, Q, H)
          },
          (error: any) => {
            if (error) console.error(error);
            console.log("success!", code);
          }
        );
      });
      barcodeContainerRef.current.appendChild(rowDiv);
    });
  }

  // <div class="barcode-item flex flex-col items-center">
  //   <canvas id="qrcode-123456789-001" height="250" width="250" style="height: 250px; width: 250px;"></canvas>
  //   <p class="code-text text-center">123456789-001</p>
  // </div>




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
            {/* <div
              ref={barcodeContainerRef}
              id="barcode-container"
              className="mt-2 flex flex-wrap justify-between"
            ></div> */}

            <div className="mt-2 grid grid-cols-2 gap-2" ref={barcodeContainerRef} id="barcode-container">
              <div className="min-h-28 bg-sky-400 flex">
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
