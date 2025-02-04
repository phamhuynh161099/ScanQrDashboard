import { Button } from "@/components/ui/button";
import { ClipboardPlus, FileUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
import * as XLSX from "xlsx";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import "@/assets/css/global-cus-tabulator.css";
import authApi from "@/apis/auth.api";
import { useAppDispatch } from "@/app/hooks";
import { setStartLoading } from "@/features/loading/loadingSlice";

const MtrlImportPage = () => {
  const [tableData, setTableData] = useState([{}]);
  const inputRef = useRef<any>(null); // Ref để truy cập input file

  const handleImport = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Mở hộp thoại chọn file khi button được click
    }
  };

  //* Get dispatch
  const dispatch = useAppDispatch();

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

  const columns: ColumnDefinition[] = [
    {
      title: "MTRL Name",
      field: "mtrl_name",
      width: 200,
      responsive: 0,
      headerFilter: "input",

      editor:"input",
      editable:true
    },
    {
      title: "MTRL Code",
      field: "mtrl_code",
      width: 150,
    },
    {
      title: "Season",
      field: "season",
      width: 150,
    },
    {
      title: "Type",
      field: "type",
      width: 150,
    },
    {
      title: "Classification",
      field: "classification",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "EPM Rating",
      field: "epm_rating",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "Composition",
      field: "composition",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "Width",
      field: "width",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "Weight",
      field: "weight",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "Price",
      field: "price",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "MTRL Type",
      field: "mtrl_type",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Created Date",
      field: "created_dt",
      hozAlign: "center",

      width: 150,
    },
    {
      title: "Created By",
      field: "created_by",
      hozAlign: "center",

      width: 150,
    },
    { title: "Location", field: "location", width: 150 },
    {
      title: "Action",
      // field: "custom",
      width: 200,
      hozAlign: "center",
      formatter: reactFormatter(<GenerateTablutorButton />),
    },

    {
      title: "Type",
      field: "type",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Supplier Name",
      field: "supplier_name",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Supplier Material Name",
      field: "supplier_material_name",
      hozAlign: "center",
      width: 150,
      editor:"input"
    },
    {
      title: "Material Code",
      field: "material_code",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Material Code - Supplier Name",
      field: "material_code_supplier_name",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Material Classification Level1",
      field: "material_classification_level_1",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "EPM Rating",
      field: "epm_rating",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Composition",
      field: "composition",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Toolbox",
      field: "toolbox",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Width",
      field: "width",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Weight",
      field: "weight",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Price",
      field: "price",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "PIC",
      field: "pic",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Request date",
      field: "request_date",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "ETC",
      field: "etc",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "ETD",
      field: "etd",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Shipping way",
      field: "shipping_way",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "ETA",
      field: "eta",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Shell",
      field: "shell",
      hozAlign: "center",
      width: 150,
    },
    {
      title: "Shefl",
      field: "shefl",
      hozAlign: "center",
      width: 150,
    },
  ];

  const callListMtrl = async () => {
    const result = await authApi.me();
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setStartLoading(true));
        const response = await callListMtrl();
        console.log("response", response);
        setTableData(data);
      } catch (error) {
        console.log("error:", error);
      } finally {
        dispatch(setStartLoading(false));
      }
    };

    fetchData();
  }, []);

  const [dataImportExcel, setData] = useState([]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
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
      const excelDataImport = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        raw: true,
        dateNF: "yyyymmdd",
      });
      console.log("excelDataImport", excelDataImport);

      let handledData = [];
      handledData = excelDataImport.map((row: any) => {
        return {
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

      console.log('data:',handledData);
      setTableData(handledData)
    }; 

    reader.readAsBinaryString(file);
    // clear data in this input tag
    inputRef.current.value = '';
  };

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
          location: "AA-01",
          created_by: "user123",
        },
        {
          mtrl_code: "88765432-002",
          created_dt: "2024/12/02 11:45:12",
          location: "AA-01",
          created_by: "user123",
        },
      ],
    },
    {
      mtrl_name: "Vai Tổng Hợp C",
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
          location: "BB-01",
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
          location: "BE-01",
        },
        {
          mtrl_code: "11223344-002",
          created_dt: "2024/12/04 14:35:45",
          created_by: "designerA",
          location: "BE-01",
        },
        {
          mtrl_code: "11223344-003",
          created_dt: "2024/12/04 14:50:10",
          created_by: "designerA",
          location: "BE-01",
        },
      ],
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
          location: "",
        },
      ],
    },
  ];

  /**
   * LAYOUT_HEADER: 48px
   */
  return (
    <>
      <div
        className={cn(
          `min-h-[calc(100vh-48px)] w-full p-2 flex-1 space-y-2 grid grid-rows-[auto_1fr]`
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
          <div className="flex justify-end space-x-2">
            <Button className="flex gap-1">
              <ClipboardPlus />
              Add New MTRL
            </Button>

            <Button className="flex gap-1" onClick={handleImport}>
              <FileUp />
              Import MTRL file
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
              // paginationSize: 10,
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
