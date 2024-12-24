import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
// theme midnight
import "tabulator-tables/dist/css/tabulator_midnight.min.css";

// function SimpleButton(props: any) {
//   const rowData = props.cell._cell.row.data;
//   const cellValue = props.cell._cell.value || "Edit | Show";
//   return (
//     <button
//       className="p-2 bg-sky-500 rounded-sm"
//       onClick={() => alert(rowData.name)}
//     >
//       {cellValue}
//     </button>
//   );
// }

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

  const SimpleButton = (props: any) => {
    const rowData = props.cell._cell.row.data;
    console.log("row,cell", rowData);

    return (
      <>
        <button
          className="p-1 bg-sky-500 rounded-sm"
          onClick={() => alert(rowData.name)}
        >
          Edit
        </button>
        <button
          className="p-1 bg-red-500 rounded-sm"
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
      field: "barcode",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    {
      title: "Code",
      field: "name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    },
    { title: "Status", field: "location" },
    { title: "Remark", field: "gender" },
    {
      title: "Action",
      // field: "custom",
      hozAlign: "center",
      formatter: reactFormatter(<SimpleButton />),
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

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="w-full min-h-28 border bg-gray-200 rounded-xl shadow-lg"></div>

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
              pagination: "local",
              paginationSize: 20,
              movableColumns: true,
              movableRows: true,
              dataTree: true,
              height: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LocationManagementPage;
