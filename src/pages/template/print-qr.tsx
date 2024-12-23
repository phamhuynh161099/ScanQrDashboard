import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
import "tabulator-tables/dist/css/tabulator_midnight.min.css"; // Chọn một theme tabulator phù hợp
// Hoặc import trực tiếp theme CSS mong muốn từ thư mục dist/css

import JsBarcode from "jsbarcode";

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
  let tableRef = useRef(null);
  const [tableData, setTableData] = useState([
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
    },
  ]);

  const columns: ColumnDefinition[] = [
    {
      title: "Name",
      field: "name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    }, //never hide this column
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
    const response = callApi();
  }, []);

  const data = [
    {
      name: "Oli Bob",
      location: "United Kingdom",
      gender: "male",
      col: "red",
      dob: "14/04/1984",
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
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
      const selectedData = tableRef.current.getSelectedData();
      console.log(selectedData);
    }
  };

  // print bar code
  let codeList = ["CODE128-40034579-01"];
  const barcodeContainerRef = useRef(null);

  useEffect(() => {
    if (barcodeContainerRef.current) {
      generateBarcodes(codeList);
    }
  }, [codeList]);

  function generateBarcodes(codes: any) {
    if (!barcodeContainerRef.current) return;
    barcodeContainerRef.current.innerHTML = "";

    codes.forEach((code: any) => {
      const barcodeDiv = document.createElement("div");
      barcodeDiv.classList.add("barcode-item");

      const barcodeImg = document.createElement("img");
      barcodeImg.id = `barcode-${code}`;

      const codeText = document.createElement("p");
      codeText.textContent = code;
      codeText.classList.add("code-text");

      barcodeDiv.appendChild(barcodeImg);
      barcodeDiv.appendChild(codeText);
      barcodeContainerRef.current.appendChild(barcodeDiv);

      // Tách type và value

      const [format, value] = code.split("-");
      let barcodeValue = value;

      if (!value) {
        barcodeValue = format;
      }

      console.log("code", code);

      JsBarcode(`#barcode-${code}`, barcodeValue, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: false,
        margin: 10,
      });
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
            onRef={(ref) => (tableRef = ref)}
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
              //   dataTreeStartExpanded: true,
            }}
          />
        </div>

        <div>
          <style>{styles}</style>
          <h1>Barcodes to Print:</h1>
          <div ref={barcodeContainerRef} id="barcode-container"></div>
          <button onClick={() => window.print()}>Print Barcodes</button>
        </div>
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
      display: inline-block;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    .code-text {
      text-align: center;
    }
  }

  .barcode-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default PrintQrPage;
