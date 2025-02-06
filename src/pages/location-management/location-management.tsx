import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
// theme midnight
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { ClipboardPlus, FileUp, Undo2 } from "lucide-react";
import LocationEditDialog from "./location-edit-dialog/location-edit-dialog";
import LocationAddDialog from "./location-add-dialog/location-add-dialog";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@/hooks/use-local-storage";
import LOCAL_STORAGE_NAME from "@/constants/localStorageName";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const LocationManagementPage = () => {
  const navigate = useNavigate();
  const [tempImportedDataExcel, setTempImportedDataExcel] = useLocalStorage(
    LOCAL_STORAGE_NAME.LOCATION_TEMP_IMPORTED_DATA_EXCEL,
    null
  );

  let tableRef = useRef<any>(null);
  //* Set/get data for React-Tabul
  const [tableData, setTableData] = useState<any[]>(() => {
    try {
      return tempImportedDataExcel;
    } catch (error) {
      console.error("Lỗi khi đọc từ localStorage:", error);
      return null;
    }
  });

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

  let columns: ColumnDefinition[] = [
    {
      title: "Type",
      field: "type",
      hozAlign: "center",

      headerFilter: "list" as any,
      headerFilterParams: { valuesLookup: true, clearable: true } as any,
      //   editor: "input",

      editor: "list" as any,
      editorParams: {
        values: { Table: "Table", Cabinet: "Cabinet", "": "" },
      },
      editable: true,
    },
    {
      title: "Shelf",
      field: "shelf",
      hozAlign: "center",

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Cell",
      field: "cell",
      hozAlign: "center",

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Location Code",
      field: "location_code",
      hozAlign: "center",

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Remark",
      field: "remark",
      hozAlign: "center",

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Action",
      // field: "custom",
      width: 200,
      hozAlign: "center",
      formatter: reactFormatter(<EdtiDeleteButton />),
    },
  ];
  //* React Tablutor

  return (
    <>
      <div
        className={cn(
          `h-[calc(100vh-48px)] w-full p-2 flex-1 space-y-2 grid grid-rows-[auto_1fr]`
        )}
      >
        <div className="w-full p-2 border rounded-xl shadow-lg h-auto space-y-2">
          {/* Filter helper */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4">
            <div>
              <Label>Season</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Season</SelectLabel>
                    <SelectItem value="apple">SS23</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator></Separator> */}

          {/* Button helper */}
          <div className="flex justify-end flex-wrap gap-1">
            <Button
              className="flex gap-1"
              onClick={() => setOpenLocationAddDialog(true)}
            >
              <ClipboardPlus />
              Add New Location
            </Button>

            <Button
              className="flex gap-1"
              onClick={() => navigate("/admin/location-management/import")}
            >
              <FileUp />
              Import Mode
            </Button>
          </div>
        </div>

        <div className="w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
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
              // paginationSize: 20,
              // movableColumns: true,
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
