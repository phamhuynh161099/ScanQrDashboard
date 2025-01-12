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
  const [tableData, setTableData] = useState([{}]);

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
      headerHozAlign: "center",
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
      name: "Vải B",
      location: "AA-01",
      barcode: "88765432-001",
    },
    {
      name: "Vải B",
      location: "AA-01",
      barcode: "88765432-002",
    },
    {
      name: "Vai Tổng Hợp C",
      location: "BB-01",
      barcode: "99012345-001",
    },
    {
      name: "Vải D",
      location: "BE-01",
      barcode: "11223344-001",
    },
    {
      name: "Vải D",
      location: "BE-01",
      barcode: "11223344-002",
    },
    {
      name: "Vải D",
      location: "BE-01",
      barcode: "11223344-003",
    },
    {
      name: "Vải F",
      location: "",
      barcode: "24681357-001",
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
