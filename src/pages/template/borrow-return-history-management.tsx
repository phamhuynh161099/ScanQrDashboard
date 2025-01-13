import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
// theme midnight
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import LocationEditDialog from "./components/location-edit-dialog";
import { ClipboardPlus } from "lucide-react";
import LocationAddDialog from "./components/location-add-dialog";

function fakeApiCall(delayInSeconds = 20) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("run");
      resolve(true);
    }, delayInSeconds * 1000);
  });
}

const BorrowReturnHistoryManagement = () => {
  let tableRef = useRef<any>(null);
  const [tableData, setTableData] = useState([]);

  //* React Tablutor
  const EdtiDeleteButton = (props: any) => {
    const rowData = props.cell._cell.row.data;

    const handleClickEdit = () => {};

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
      title: "MTRL Code",
      field: "mtrl_code",
      width: 200,
      responsive: 0,
      headerFilter: "input",
      //   headerFilter: "list" as any,
      //   headerFilterParams: { valuesLookup: true, clearable: true } as any,
    },
    {
      title: "MTRL Name",
      field: "mtrl_name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    {
      title: "User Id",
      field: "user_id",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    {
      title: "User Name",
      field: "user_name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    {
      title: "Borrow Date",
      field: "borrow_date",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    {
      title: "ETC Return",
      field: "etc_return",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    { title: "Remark", field: "remark", width: 200 },
    {
      title: "Return Status",
      field: "return_status",
      width: 200,
      responsive: 0,
      //   headerFilter: "input",
      headerFilter: "list" as any,
      headerFilterParams: { valuesLookup: true, clearable: true } as any,
    },
    {
      title: "Return Date",
      field: "return_date",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    // {
    //   title: "Action",
    //   // field: "custom",
    //   width: 200,
    //   hozAlign: "center",
    //   formatter: reactFormatter(<EdtiDeleteButton />),
    // },
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
      mtrl_code: "40034579-001",
      mtrl_name: "VAI A",
      user_id: "122040117",
      user_name: "SAKATA",
      borrow_date: "2024/12/20 10:40:00",
      etc_return: "2024/12/30",
      remark: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      return_status: "NOT YET",
    },
    {
      mtrl_code: "11223344-002",
      mtrl_name: "VAI D",
      user_id: "122040117",
      user_name: "PHAM HUYNH",
      borrow_date: "2024/12/24 14:45:00",
      etc_return: "2025/01/28",
      return_status: "NOT YET",
      remark:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    },
    {
      mtrl_code: "40034509-001",
      mtrl_name: "VAI J",
      user_id: "122040126",
      user_name: "TRAN VAN",
      borrow_date: "2024/12/29 19:40:00",
      etc_return: "2024/12/30",
      return_status: "DONE",
      return_date: "2024/12/29",
      remark:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    },
  ];

  //* React Tablutor

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="w-full min-h-10 p-2 border bg-gray-200 rounded-xl shadow-lg flex justify-end"></div>

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
    </>
  );
};

export default BorrowReturnHistoryManagement;
