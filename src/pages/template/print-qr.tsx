import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
// theme midnight
import "tabulator-tables/dist/css/tabulator_midnight.min.css";

// import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

function SimpleButton(props: any) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Edit | Show";
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

function fakeApiCall(delayInSeconds = 20) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("run");
      resolve(true); // Trả về dữ liệu sau khi delay
    }, delayInSeconds * 1000); // Chuyển đổi giây sang mili giây
  });
}

const PrintQrPage = () => {
  let tableRef = useRef<any>(null);
  const [tableData, setTableData] = useState([
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
      barcode: "123456789-004",
    },
  ]);

  const columns: ColumnDefinition[] = [
    {
      title: "",
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cellClick: function (e, cell) {
        console.log("cell", cell.getRow());
        cell.getRow().toggleSelect();
      },
    },
    {
      title: "Bar Code",
      field: "barcode",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    {
      title: "Name",
      field: "name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    { title: "Location", field: "location", width: 150 },
    { title: "Gender", field: "gender", width: 150, responsive: 2 }, //hide this column first
    { title: "Favourite Color", field: "col", width: 150 },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },

    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
  ];

  const callApi = async () => {
    await fakeApiCall(1).then(() => {
      setTableData(data);
    });
    return 1;
  };

  useEffect(() => {
    callApi();
  }, []);

  const data = [
    {
      name: "Oli Bob",
      location: "United Kingdom",
      gender: "male",
      col: "red",
      dob: "14/04/1984",
      barcode: "123456789-001",
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
      barcode: "123456789-002",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
      barcode: "123456789-003",
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
      barcode: "123456789-004",
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
      barcode: "123456789-005",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
      barcode: "123456789-006",
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
      barcode: "123456789-007",
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
      barcode: "123456789-008",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
      barcode: "123456789-009",
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
      barcode: "123456789-010",
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
      barcode: "123456789-002",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
      barcode: "123456789-003",
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
      barcode: "123456789-004",
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
      barcode: "123456789-002",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
      barcode: "123456789-003",
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
      barcode: "123456789-004",
    },
  ];

  const handleRowClick = (e: any, row: any) => {
    console.log("Row clicked:", row.getData()); // In ra dữ liệu của hàng được click
    alert(`You clicked row with ID: ${row.getData().id}`); // Hiển thị thông báo
    // Thực hiện các hành động khác khi click vào hàng...
  };

  const getSelectedRows = () => {
    console.log("selectedData", tableRef.current);
    if (tableRef.current) {
      let listCode = [];
      const selectedData = [...tableRef.current.current.getSelectedData()];
      listCode = selectedData.map((value: any) => value.barcode);
      setCodeList([...listCode]);
      console.log(selectedData, listCode);
    }
  };

  //* print bar code
  const [codeList, setCodeList] = useState<any[]>([]);
  const barcodeContainerRef = useRef<any>(null);

  useEffect(() => {
    if (barcodeContainerRef.current) {
      generateBarcodes(codeList);
    }
  }, [codeList]);

  // function generateBarcodes(codes: any) {
  //   if (!barcodeContainerRef.current) return;
  //   barcodeContainerRef.current.innerHTML = "";

  //   codes.forEach((code: any) => {
  //     const barcodeDiv = document.createElement("div");
  //     barcodeDiv.classList.add("barcode-item");

  //     // Tạo canvas cho QR code
  //     const qrCanvas = document.createElement("canvas");
  //     qrCanvas.id = `qrcode-${code}`;

  //     const codeText = document.createElement("p");
  //     codeText.textContent = code;
  //     codeText.classList.add("code-text");

  //     barcodeDiv.appendChild(qrCanvas);
  //     barcodeDiv.appendChild(codeText);
  //     barcodeContainerRef.current.appendChild(barcodeDiv);

  //     let qrcodeValue = code;

  //     // Tạo QR code sử dụng qrcode.js
  //     QRCode.toCanvas(
  //       qrCanvas,
  //       qrcodeValue,
  //       {
  //         width: 200, // Kích thước QR code
  //         margin: 2, // Margin
  //         errorCorrectionLevel: "H", // Mức độ sửa lỗi (L, M, Q, H)
  //       },
  //       (error: any) => {
  //         if (error) console.error(error);
  //         console.log("success!");
  //       }
  //     );
  //   });
  // }

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
      rowDiv.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "mb-10",
        "w-full",
        "items-center",
        "mx-auto"
      ); // Tailwind classes for a row

      group.forEach((code: any) => {
        const barcodeDiv = document.createElement("div");
        barcodeDiv.classList.add(
          "barcode-item",
          "flex",
          "flex-col",
          "items-center",
          "mx-2"
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
            width: 100, // Kích thước QR code
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
      <div className="min-h-[100%] w-full p-2">
        <div className="">
          <Button onClick={getSelectedRows}>Print</Button>
        </div>

        <div className="min-h-[400px] h-[70vh] w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
          <ReactTabulator
            onRef={(ref) => (tableRef.current = ref)}
            data={tableData}
            columns={columns}
            events={
              {
                //   rowClick: handleRowClick,
              }
            }
            layout="fitColumns" // Tùy chọn layout
            options={{
              pagination: "local", // Phân trang
              paginationSize: 5, // Số hàng trên mỗi trang
              movableColumns: true,
              movableRows: true,
              dataTree: true,
              height: "100%",
            }}
          />
        </div>

        {/* QR block */}
        <div className="p-8">
          <style>{styles}</style>
          <h1 className="text-2xl font-bold mb-4">QR Codes to Print:</h1>
          <div
            ref={barcodeContainerRef}
            id="barcode-container"
            className="flex flex-wrap justify-between"
          ></div>
          <button
            onClick={() => window.print()}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print QR Codes
          </button>
        </div>
        {/* QR block */}
      </div>
    </>
  );
};

// CSS (tùy chọn - có thể đưa vào file CSS riêng):
const styles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #barcode-container, #barcode-container * {
      visibility: visible;
    }
    #barcode-container {
      position: absolute;
      left: 0;
      top: 0;
    }
    .barcode-item {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
  }
`;

export default PrintQrPage;
