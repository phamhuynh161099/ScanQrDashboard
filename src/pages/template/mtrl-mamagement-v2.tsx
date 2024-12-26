import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
import "tabulator-tables/dist/css/tabulator_midnight.min.css"; // Chọn một theme tabulator phù hợp
import MtrlAddDialog from "./components/mtrl-add-dialog";
import moment from "moment";
import MtrlEditDialog from "./components/mtrl-edit-dialog";
// Hoặc import trực tiếp theme CSS mong muốn từ thư mục dist/css

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

const MtrlManagementV2Page = () => {
  const [tableData, setTableData] = useState([{}]);

  //* Add New Row MTRL
  const [openMtrlAddDialog, setOpenMtrlAddDialog] = useState<boolean>(true);
  const handleOpenMtrlAddDialog = (value: any) => {
    setOpenMtrlAddDialog(value);
  };
  const handleSaveChangeAdd = (dataSaveChanges: any) => {
    console.log("data save changes", dataSaveChanges);
  };
  //* Add New Row MTRL

  //* Edit Row
  const [openMtrlEditDialog, setOpenMtrlEditDialog] = useState(false);
  const [dataEditMtrl, setDataEditMtrl] = useState<any>(null);
  const handleOpenMtrlEditDialog = (value: any) => {
    setOpenMtrlEditDialog(value);
    setDataEditMtrl(null);
  };
  const handleSaveChangeEdit = (dataSaveChanges: any) => {
    console.log("data save changes", dataSaveChanges);
  };
  //* Edit Row

  //* React Tablutor
  const GenerateTablutorButton = (props: any) => {
    const rowData = props.cell._cell.row.data;

    //* defaul parent | children
    const rowLevel = rowData["level"] || "children";

    const handleClickAddItem = () => {
      console.log("rowData", rowData, tableData);

      let _tableData = tableData.map((value: any, idx) => {
        if (value.mtrl_code == rowData.mtrl_code) {
          value["_children"].push({
            mtrl_code: `${rowData.mtrl_code}-00${
              value["_children"].length + 1
            }`,
            created_dt: moment().format("YYYY/MM/DD HH:mm:ss"),
            created_by: "__",
          });
        }

        return value;
      });

      setTableData(_tableData);
      alert("Add item for MTRL success!");

      // setOpenLocationEditDialog(true);
      // setDataEditLocation(rowData);
    };

    const handleClickEdit = () => {
      setOpenMtrlEditDialog(true);
      setDataEditMtrl(rowData);
    };

    return (
      <>
        {rowLevel === "parent" && (
          <>
            <button
              className="px-2 bg-sky-500 rounded-sm"
              onClick={() => handleClickAddItem()}
            >
              Add Item
            </button>
            <button
              className="ml-1 px-2 bg-yellow-500 rounded-sm"
              onClick={() => handleClickEdit()}
            >
              Edit
            </button>
            <button className="ml-1 px-2 bg-red-500 rounded-sm">Delete</button>
          </>
        )}

        {rowLevel === "children" && (
          <>
            <button className="ml-1 px-2 bg-red-500 rounded-sm">Delete</button>
          </>
        )}
      </>
    );
  };

  const columns: ColumnDefinition[] = [
    {
      title: "MTRL Name",
      field: "mtrl_name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    { title: "MTRL Code", field: "mtrl_code", width: 150 },
    { title: "Season", field: "season", width: 150 }, //hide this column first
    { title: "Type", field: "type", width: 150 },
    {
      title: "Classification",
      field: "classification",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "EPM Rating",
      field: "epm_rating",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Composition",
      field: "composition",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Width",
      field: "width",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Weight",
      field: "weight",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Price",
      field: "price",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "MTRL Type",
      field: "mtrl_type",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Created Date",
      field: "created_dt",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Created By",
      field: "created_by",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Action",
      // field: "custom",
      width: 200,
      hozAlign: "center",
      formatter: reactFormatter(<GenerateTablutorButton />),
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

  const data: any = [
    {
      mtrl_name: "Vải B",
      mtrl_code: "88765432",
      supplier: "HOANG DINH HOANG",
      season: "FW24/FW25",
      type: "textile",
      classification: "Double Knit Jersey",
      epm_rating: "EPM 4",
      composition: "60% Cotton, 40% Polyester",
      width: '60"',
      weight: "250",
      price: "3.80",
      mtrl_type: "",
      created_dt: "2024/12/02 11:22:33",
      created_by: "user123",
      level: "parent",
      _children: [
        {
          mtrl_code: "88765432-001",
          created_dt: "2024/12/02 11:30:00",
          created_by: "user123",
        },
        {
          mtrl_code: "88765432-002",
          created_dt: "2024/12/02 11:45:12",
          created_by: "user123",
        },
      ],
    },
    {
      mtrl_name: "Da Tổng Hợp C",
      mtrl_code: "99012345",
      supplier: "HOANG DINH HOANG",
      season: "SS25",
      type: "synthetic leather",
      classification: "PU Leather",
      epm_rating: "EPM 3",
      composition: "100% PU",
      width: '58"',
      weight: "450",
      price: "5.20",
      mtrl_type: "",
      created_dt: "2024/12/03 08:55:10",
      created_by: "admin",
      level: "parent",
      _children: [
        {
          mtrl_code: "99012345-001",
          created_dt: "2024/12/03 09:10:20",
          created_by: "admin",
        },
      ],
    },
    {
      mtrl_name: "Vải D",
      mtrl_code: "11223344",
      supplier: "HOANG DINH HOANG",
      season: "AW24",
      type: "textile",
      classification: "Twill Weave",
      epm_rating: "EPM 4",
      composition: "70% Cotton, 30% Linen",
      width: '56"',
      weight: "300",
      price: "4.15",
      mtrl_type: "",
      created_dt: "2024/12/04 14:01:59",
      created_by: "designerA",
      level: "parent",
      _children: [
        {
          mtrl_code: "11223344-001",
          created_dt: "2024/12/04 14:20:30",
          created_by: "designerA",
        },
        {
          mtrl_code: "11223344-002",
          created_dt: "2024/12/04 14:35:45",
          created_by: "designerA",
        },
        {
          mtrl_code: "11223344-003",
          created_dt: "2024/12/04 14:50:10",
          created_by: "designerA",
        },
      ],
    },
    {
      mtrl_name: "Chỉ May E",
      mtrl_code: "55667788",
      supplier: "HOANG DINH HOANG",
      season: "SS24&SS25&FW24&FW25",
      type: "thread",
      classification: "Spun Polyester",
      epm_rating: "EPM 5",
      composition: "100% Polyester",
      width: "",
      weight: "100", // Assume weight per spool/unit
      price: "1.50",
      mtrl_type: "",
      created_dt: "2024/12/05 10:33:48",
      created_by: "admin",
      level: "parent",
      _children: [],
    },
    {
      mtrl_name: "Vải F",
      mtrl_code: "24681357",
      supplier: "HOANG DINH HOANG",
      season: "FW25",
      type: "textile",
      classification: "Polar Fleece",
      epm_rating: "EPM 3",
      composition: "100% Polyester",
      width: '62"',
      weight: "320",
      price: "3.95",
      mtrl_type: "",
      created_dt: "2024/12/06 16:45:21",
      created_by: "user456",
      level: "parent",
      _children: [
        {
          mtrl_code: "24681357-001",
          created_dt: "2024/12/06 17:00:05",
          created_by: "user456",
        },
      ],
    },
    {
      mtrl_name: "Khóa Kéo G",
      mtrl_code: "97531864",
      supplier: "HOANG DINH HOANG",
      season: "SS25&FW25",
      type: "zipper",
      classification: "Metal Zipper",
      epm_rating: "EPM 4",
      composition: "Zinc Alloy",
      width: "3cm", // Zipper width
      weight: "50", // Assume weight per unit length
      price: "0.85",
      mtrl_type: "",
      created_dt: "2024/12/07 09:12:34",
      created_by: "admin",
      level: "parent",
      _children: [],
    },
    {
      mtrl_name: "Vải H",
      mtrl_code: "31415926",
      supplier: "HOANG DINH HOANG",
      season: "AW24",
      type: "textile",
      classification: "Herringbone",
      epm_rating: "EPM 5",
      composition: "50% Wool, 50% Acrylic",
      width: '58"',
      weight: "400",
      price: "6.50",
      mtrl_type: "",
      created_dt: "2024/12/08 13:28:50",
      created_by: "designerB",
      level: "parent",
      _children: [
        {
          mtrl_code: "31415926-001",
          created_dt: "2024/12/08 13:40:15",
          created_by: "designerB",
        },
        {
          mtrl_code: "31415926-002",
          created_dt: "2024/12/08 13:55:30",
          created_by: "designerB",
        },
      ],
    },
    {
      mtrl_name: "Nút Nhựa I",
      mtrl_code: "62831853",
      supplier: "HOANG DINH HOANG",
      season: "SS24&SS25",
      type: "button",
      classification: "4-Hole Button",
      epm_rating: "EPM 3",
      composition: "Recycled Plastic",
      width: "2cm", // Button diameter
      weight: "5", // Assume weight per button
      price: "0.10",
      mtrl_type: "",
      created_dt: "2024/12/09 17:11:02",
      created_by: "admin",
      level: "parent",
      _children: [],
    },
    {
      mtrl_name: "Vải J",
      mtrl_code: "13579246",
      supplier: "HOANG DINH HOANG",
      season: "FW24",
      type: "textile",
      classification: "Corduroy",
      epm_rating: "EPM 4",
      composition: "95% Cotton, 5% Spandex",
      width: '57"',
      weight: "350",
      price: "4.75",
      mtrl_type: "",
      created_dt: "2024/12/10 10:59:47",
      created_by: "user789",
      level: "parent",
      _children: [
        {
          mtrl_code: "13579246-001",
          created_dt: "2024/12/10 11:15:00",
          created_by: "user789",
        },
        {
          mtrl_code: "13579246-002",
          created_dt: "2024/12/10 11:20:00",
          created_by: "user789",
        },
        {
          mtrl_code: "13579246-003",
          created_dt: "2024/12/10 11:25:00",
          created_by: "user789",
        },
      ],
    },
    {
      mtrl_name: "Ren K",
      mtrl_code: "86420975",
      supplier: "HOANG DINH HOANG",
      season: "SS25",
      type: "textile",
      classification: "Lace Trim",
      epm_rating: "EPM 5",
      composition: "80% Nylon, 20% Cotton",
      width: "10cm", // Lace width
      weight: "80", // Assume weight per unit length
      price: "2.20",
      mtrl_type: "",
      created_dt: "2024/12/11 14:33:29",
      created_by: "designerC",
      level: "parent",
      _children: [
        {
          mtrl_code: "86420975-001",
          created_dt: "2024/12/11 14:45:00",
          created_by: "designerC",
        },
      ],
    },
  ];

  const handleRowClick = (e: any, row: any) => {
    console.log("Row clicked:", row.getData()); // In ra dữ liệu của hàng được click
    alert(`You clicked row with ID: ${row.getData().id}`); // Hiển thị thông báo
    // Thực hiện các hành động khác khi click vào hàng...
  };

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="w-full p-2 border rounded-xl shadow-lg flex justify-end">
          <Button
            className="bg-sky-400 hover:bg-sky-700 flex gap-1"
            onClick={() => setOpenMtrlAddDialog(true)}
          >
            <ClipboardPlus />
            Add New MTRL
          </Button>
        </div>

        <div className="mt-2 min-h-[400px] h-[70vh] w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
          <ReactTabulator
            onRef={(ref) => (ref = ref)}
            data={tableData}
            columns={columns}
            events={
              {
                //   rowClick: handleRowClick,
              }
            }
            layout="fitColumns" // Tùy chọn layout
            options={{
              pagination: "local",
              paginationSize: 20,
              // movableColumns: true,
              movableRows: true,
              dataTree: true,
              height: "100%",
              //   dataTreeStartExpanded: true,
            }}
          />
        </div>
      </div>

      {dataEditMtrl && (
        <MtrlEditDialog
          data={dataEditMtrl}
          open={openMtrlEditDialog}
          handleSaveChangeEdit={handleSaveChangeEdit}
          handleOpenMtrlEditDialog={handleOpenMtrlEditDialog}
        />
      )}

      {openMtrlAddDialog && (
        <MtrlAddDialog
          open={openMtrlAddDialog}
          handleSaveChangeAdd={handleSaveChangeAdd}
          handleOpenMtrlAddDialog={handleOpenMtrlAddDialog}
        />
      )}
    </>
  );
};

export default MtrlManagementV2Page;
