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
    console.log("run effect", data, codeList);
    if (data && data.length > 0) {
      console.log("run>>", data, codeList);
      setCodeList(data);
      generateBarcodes(codeList);
    }
  });

  function generateBarcodes(codes: any) {
    if (!barcodeContainerRef.current) return;
    barcodeContainerRef.current.innerHTML = "";

    // Nhóm 2 code vào 1 mảng con
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
          "items-center",
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

  return (
    <>
      {open && (
        <>
          <div className="absolute top-1 w-[calc(100%-16px)] min-h-[calc(100vh-5rem)] px-4 py-2 bg-gray-800 rounded-xl">
            <style>{styles}</style>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">QR Codes Preview</h1>
              <X className="size-10 cursor-pointer"
               onClick={() => handleOnChangeOpen(false)} />
            </div>

            <div className="mt-2">
              <button
                onClick={() => window.print()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2"
              >
                <Printer />Print QR Codes
              </button>
            </div>
            <div
              ref={barcodeContainerRef}
              id="barcode-container"
              className="mt-2 flex flex-wrap justify-between"
            ></div>
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
