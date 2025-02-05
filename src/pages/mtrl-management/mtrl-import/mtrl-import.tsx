import { useAppDispatch } from "@/app/hooks";
import "@/assets/css/global-cus-tabulator.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LOCAL_STORAGE_NAME from "@/constants/localStorageName";
import {
  setEndLoading,
  setStartLoading,
} from "@/features/loading/loadingSlice";
import useLocalStorage from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { CloudUpload, Eraser, FileUp, SaveAll, Undo2 } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
import { toast } from "react-toastify";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import * as XLSX from "xlsx";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const MtrlImportPage = () => {
  const navigate = useNavigate();
  const [tempImportedDataExcel, setTempImportedDataExcel] = useLocalStorage(
    LOCAL_STORAGE_NAME.MTRL_TEMP_IMPORTED_DATA_EXCEL,
    null
  );

  let tableRef = useRef<any>(null);
  const [editedRows, setEditedRows] = useState<any>();

  //* Set/get data for React-Tabul
  const [tableData, setTableData] = useState<any[]>(() => {
    try {
      return tempImportedDataExcel;
    } catch (error) {
      console.error("Lỗi khi đọc từ localStorage:", error);
      return null;
    }
  });
  //* Ref để truy cập tag input file
  const inputRef = useRef<any>(null);

  //* Get dispatch
  const dispatch = useAppDispatch();

  //*!========== React Tablutor
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
      toast.success("Add item for MTRL success!");
      // setOpenLocationEditDialog(true);
      // setDataEditLocation(rowData);
    };

    const handleClickEdit = () => {};

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

  let columns: ColumnDefinition[] = [
    {
      title: "Type",
      field: "type",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Supplier Name",
      field: "supplier_name",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Supplier Material Name",
      field: "supplier_material_name",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Material Code",
      field: "material_code",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Material Code - Supplier Name",
      field: "material_code_supplier_name",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Material Classification Level1",
      field: "material_classification_level_1",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "EPM Rating",
      field: "epm_rating",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Composition",
      field: "composition",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Toolbox",
      field: "toolbox",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Width",
      field: "width",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Weight",
      field: "weight",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Price",
      field: "price",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "PIC",
      field: "pic",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Request date",
      field: "request_date",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "ETC",
      field: "etc",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "ETD",
      field: "etd",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Shipping way",
      field: "shipping_way",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "ETA",
      field: "eta",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Shell",
      field: "shell",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Shefl",
      field: "shefl",
      hozAlign: "center",
      width: 150,

      headerFilter: "input",
      editor: "input",
      editable: true,
    },
    {
      title: "Action",
      // field: "custom",
      width: 200,
      hozAlign: "center",
      formatter: reactFormatter(<GenerateTablutorButton />),
    },
  ];

  //* Handel cell when it been edited
  const handleCellEdit = (cell: any) => {
    const rowData = cell.getRow().getData();
    const rowId = rowData.custom_id;
    setEditedRows((prevEditedRows: any) => ({
      ...prevEditedRows,
      [rowId]: rowData,
    }));

    //* Lấy phần tử cha trực tiếp
    const parentElement = cell.getElement().parentElement;

    if (parentElement) {
      parentElement.style.backgroundColor = "#ef4444";
      parentElement.style.color = "white";
    }
  };

  //* Add new function to support for this row
  columns = columns.map((col) => {
    if (col.editable) {
      return {
        ...col,
        cellEdited: handleCellEdit,
      };
    }
    return col;
  });
  //*!=========== React Tablutor

  //* Function Import Excel File
  const handleImport = () => {
    if (inputRef.current) {
      //* Mở hộp thoại chọn file khi button được click
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      dispatch(setStartLoading(true));

      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: "binary",
        cellText: false,
        cellDates: true,
      });
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let excelDataImport: any = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        raw: true,
        dateNF: "yyyymmdd",
      });

      if (excelDataImport.length > 0) {
        excelDataImport = excelDataImport.slice(1);
      }

      let handledData = [];
      handledData = excelDataImport.map((row: any) => {
        return {
          custom_id: nanoid(),
          type: row[0],
          supplier_name: row[1],
          supplier_material_name: row[2],
          material_code: row[3],
          material_code_supplier_name: row[4],
          material_classification_level_1: row[5],
          material_classification_level_2: row[6],
          material_classification_level_3: row[7],
          material_classification_level_4: row[8],
          material_classification: row[9],
          epm_rating: row[11],
          composition: row[12],
          toolbox: row[13],
          width: row[14],
          weight: row[15],
          price: row[16],
          pic: row[17],
          request_date: row[18],
          etc: row[19],
          etd: row[20],
          shipping_way: row[21],
          eta: row[22],
          shell: row[23],
          shefl: row[26],
        };
      });

      //* Set data for React-Tabul
      setTableData(handledData);

      //* Set Data into local storage
      setTempImportedDataExcel(handledData);

      dispatch(setEndLoading(false));
    };

    reader.readAsBinaryString(file);
    // clear data in this input tag
    inputRef.current.value = "";
  };
  //* Function Import Excel File

  /**
   * Function to save temp data
   */
  const handleSaveChange = () => {
    try {
      dispatch(setStartLoading(true));
      setTempImportedDataExcel(tableData);
      setTableData([...tableData]);

      const numberRowsNeedSave = Object.keys(editedRows).length;
      toast.success(`Have ${numberRowsNeedSave} saved success`);
    } catch (error) {
      toast.error("Save Error");
    } finally {
      dispatch(setEndLoading(false));
    }
  };

  const handleClearFileExcell = () => {
    setTempImportedDataExcel();
    setTableData([]);
  };

  /**
   * LAYOUT_HEADER: 48px
   */
  return (
    <>
      <div
        className={cn(
          `h-[calc(100vh-48px)] w-full p-2 flex-1 space-y-2 grid grid-rows-[auto_1fr]`
        )}
      >
        <div className="w-full p-2 border rounded-xl shadow-lg h-auto space-y-2">
          {/* Filter helper */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div>
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

          {/* Button helper */}
          <div className="flex justify-end flex-wrap gap-1">
            <Button className="flex gap-1" onClick={handleImport}>
              <FileUp />
              Import MTRL file
            </Button>

            <Button className="flex gap-1" onClick={handleSaveChange}>
              <SaveAll />
              Save Change
            </Button>

            <Button className="flex gap-1" onClick={handleImport}>
              <CloudUpload />
              Upload File
            </Button>

            <Button className="flex gap-1" onClick={handleClearFileExcell}>
              <Eraser />
              Clear
            </Button>

            <Button
              className="flex gap-1"
              onClick={() => navigate("/admin/mtrl-management")}
            >
              <Undo2 />
            </Button>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              ref={inputRef} // Gán ref cho input file
              style={{ display: "none" }} // Ẩn input file
            />
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
            layout="fitColumns" // Tùy chọn layout
            options={{
              pagination: "local",
              // paginationSize: 20,
              // movableColumns: true,
              movableRows: false,
              dataTree: true,
              height: "100%",
              // dataTreeStartExpanded: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MtrlImportPage;
