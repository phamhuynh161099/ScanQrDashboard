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
import PrintQrPreviewDialog from "./components/print-qr-preview-dialog";
import { QrCode } from "lucide-react";

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

  const [openPrintQrPreviewDialog, setOpenPrintQrPreviewDialog] =
    useState(false);
  const haldleOpenPrintQrPreviewDialog = (value: any) => {
    setOpenPrintQrPreviewDialog(value);
  };

  const columns: ColumnDefinition[] = [
    {
      title: "",
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      headerHozAlign : "center",
      hozAlign: "center",
      headerSort: false,
      cellClick: function (e, cell) {
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
    console.log("Row clicked:", row.getData());
  };

  const getSelectedRows = () => {
    if (tableRef.current) {
      let listCode = [];
      const selectedData = tableRef.current.current.getSelectedData();
      listCode = selectedData.map((value: any) => value.barcode);
      setCodeList(listCode);
      setOpenPrintQrPreviewDialog(true);
    }
  };

  //* print bar code
  const [codeList, setCodeList] = useState<any[]>([]);

  return (
    <>
      <div className="min-h-[100%] w-full relative p-2">
        <div className="">
          <Button className="flex gap-2" onClick={getSelectedRows}>
            <QrCode />
            Generate QR
          </Button>
        </div>

        <div className="mt-2 min-h-[400px] h-[70vh] w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
          <ReactTabulator
            onRef={(ref) => (tableRef.current = ref)}
            data={tableData}
            columns={columns}
            events={
              {
                //   rowClick: handleRowClick,
              }
            }
            layout="fitColumns"
            options={{
              pagination: "local", // Phân trang
              paginationSize: 20,
              movableColumns: true,
              movableRows: true,
              dataTree: true,
              height: "100%",
            }}
          />
        </div>

        {/* QR block */}
        <PrintQrPreviewDialog
          data={codeList}
          open={openPrintQrPreviewDialog}
          haldleOpenPrintQrPreviewDialog={haldleOpenPrintQrPreviewDialog}
        />
        {/* QR block */}
      </div>
    </>
  );
};

export default PrintQrPage;
