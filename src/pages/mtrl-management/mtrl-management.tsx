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
import { useEffect, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import MtrlAddDialog from "./mtrl-add-dialog/mtrl-add-dialog";
import MtrlEditDialog from "./mtrl-edit-dialog/mtrl-edit-dialog";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import "@/assets/css/global-cus-tabulator.css";
import authApi from "@/apis/auth.api";
import { useAppDispatch } from "@/app/hooks";
import { setStartLoading } from "@/features/loading/loadingSlice";
import { useNavigate } from "react-router-dom";

const MtrlManagementPage = () => {
  const [tableData, setTableData] = useState([{}]);

  const navigate = useNavigate();

  //* Get dispatch
  const dispatch = useAppDispatch();

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
      toast.success("Add item for MTRL success!");
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
  //* React Tablutor

  const handleClickRedirectImportMode = () => {
    navigate("/admin/mtrl-management/import");
  };

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

  // const handleRowClick = (e: any, row: any) => {
  //   console.log("Row clicked:", row.getData());
  //   alert(`You clicked row with ID: ${row.getData().id}`);
  // };

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
            <Button
              className="flex gap-1"
              onClick={() => setOpenMtrlAddDialog(true)}
            >
              <ClipboardPlus />
              Add New MTRL
            </Button>

            <Button
              className="flex gap-1"
              onClick={handleClickRedirectImportMode}
            >
              <FileUp />
              Import Mode
            </Button>
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
              paginationSize: 50,
              // movableColumns: true,
              movableRows: true,
              dataTree: true,
              height: "100%",
              // dataTreeStartExpanded: true,
            }}
          />
        </div>
      </div>

      {/* popup edit row */}
      {dataEditMtrl && (
        <MtrlEditDialog
          data={dataEditMtrl}
          open={openMtrlEditDialog}
          handleSaveChangeEdit={handleSaveChangeEdit}
          handleOpenMtrlEditDialog={handleOpenMtrlEditDialog}
        />
      )}

      {/* popup add row */}
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

export default MtrlManagementPage;
