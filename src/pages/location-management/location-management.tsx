import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
// theme midnight
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { ClipboardPlus } from "lucide-react";
import LocationEditDialog from "./location-edit-dialog/location-edit-dialog";
import LocationAddDialog from "./location-add-dialog/location-add-dialog";

function fakeApiCall(delayInSeconds = 20) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("run");
      resolve(true);
    }, delayInSeconds * 1000);
  });
}

const LocationManagementPage = () => {
  let tableRef = useRef<any>(null);
  const [tableData, setTableData] = useState([]);

  //* Edit Row
  const [openLocationEditDialog, setOpenLocationEditDialog] = useState(false);
  const [dataEditLocation, setDataEditLocation] = useState<any>(null);
  const handleOpenLocationEditDialog = (value: any) => {
    setOpenLocationEditDialog(value);
    setDataEditLocation(null);
  };
  const handleSaveChangeEdit = (dataSaveChanges: any) => {
    console.log("data save changes", dataSaveChanges);
  };
  //* Edit Row

  //* Add New Row
  const [openLocationAddDialog, setOpenLocationAddDialog] = useState(false);
  const handleOpenLocationAddDialog = (value: any) => {
    setOpenLocationAddDialog(value);
  };
  const handleSaveChangeAdd = (dataSaveChanges: any) => {
    console.log("data save changes", dataSaveChanges);
  };
  //* Add New Row

  //* React Tablutor
  const EdtiDeleteButton = (props: any) => {
    const rowData = props.cell._cell.row.data;

    const handleClickEdit = () => {
      setOpenLocationEditDialog(true);
      setDataEditLocation(rowData);
    };

    return (
      <>
        <button
          className="px-2 bg-sky-500 rounded-sm"
          onClick={() => handleClickEdit()}
        >
          Edit
        </button>
        <button
          className="ml-1 px-2 bg-red-500 rounded-sm"
          onClick={() => alert(rowData.name)}
        >
          Delete
        </button>
      </>
    );
  };

  const columns: ColumnDefinition[] = [
    {
      title: "Type",
      field: "type_location",
      width: 200,
      responsive: 0,
      // headerFilter: "input",
      headerFilter: "list" as any,
      headerFilterParams: { valuesLookup: true, clearable: true } as any,
    },
    {
      title: "Code",
      field: "location_code",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    // { title: "Status", field: "status", width: 200 },
    { title: "Remark", field: "remark" },
    {
      title: "Action",
      // field: "custom",
      width: 200,
      hozAlign: "center",
      formatter: reactFormatter(<EdtiDeleteButton />),
    },
  ];

  const callApi = async () => {
    await fakeApiCall(1).then(() => {
      setTableData(data);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  const data: any = [
    {
      type_location: "board_001",
      location_code: "AA-1",
      status: true,
      remark: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      type_location: "board_002",
      location_code: "AB-5",
      status: false,
      remark:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      type_location: "board_001",
      location_code: "AC-2",
      status: true,
      remark:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      type_location: "board_003",
      location_code: "BA-3",
      status: true,
      remark:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      type_location: "board_002",
      location_code: "BB-7",
      status: false,
      remark:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      type_location: "board_004",
      location_code: "CA-9",
      status: true,
      remark:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      type_location: "board_003",
      location_code: "CB-4",
      status: true,
      remark:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      type_location: "board_001",
      location_code: "AD-8",
      status: false,
      remark:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      type_location: "board_005",
      location_code: "DA-6",
      status: true,
      remark:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      type_location: "board_004",
      location_code: "DC-1",
      status: false,
      remark: "Lorem ipsum dolor sit amet.",
    },
  ];
  //* React Tablutor

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="w-full p-2 border rounded-xl shadow-lg flex justify-end">
          <Button
            className="bg-sky-400 hover:bg-sky-700 hover:text-white text-black flex gap-1"
            onClick={() => setOpenLocationAddDialog(true)}
          >
            <ClipboardPlus />
            Add New Location
          </Button>
        </div>

        <div className="mt-2 min-h-[400px] h-[80vh] w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
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
              pagination: "local",
              paginationSize: 20,
              movableColumns: true,
              // movableRows: true,
              dataTree: true,
              height: "100%",
            }}
          />
        </div>
      </div>

      {dataEditLocation && (
        <LocationEditDialog
          data={dataEditLocation}
          open={openLocationEditDialog}
          handleSaveChangeEdit={handleSaveChangeEdit}
          handleOpenLocationEditDialog={handleOpenLocationEditDialog}
        />
      )}

      {openLocationAddDialog && (
        <LocationAddDialog
          open={openLocationAddDialog}
          handleSaveChangeAdd={handleSaveChangeAdd}
          handleOpenLocationAddDialog={handleOpenLocationAddDialog}
        />
      )}
    </>
  );
};

export default LocationManagementPage;
